import { useCallback, useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import PropTypes from 'prop-types';

import useConfig from 'src/hooks/useConfig';

import WorkboxContext from './WorkboxContext';
import WorkboxSkipWaitingPrompt from './WorkboxSkipWaitingPrompt';

const WorkboxProvider = ({
  children,
  promptBeforeSkipWaiting,
  serviceWorkerFileName,
  ...props
}) => {
  const config = useConfig();
  const [workbox, setWorkbox] = useState(undefined);
  const [registration, setRegistration] = useState(undefined);
  const [isCheckingForUpdates, setIsCheckingForUpdates] = useState(false);
  const [promptState, setPromptState] = useState({
    accepted: false,
    showPrompt: false
  });
  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const reloadWhenReady = async () => {
      if (workbox) {
        workbox.addEventListener('controlling', (event) => {
          console.info('workbox.controlling', event.isUpdate, event.isExternal, event);
          reload();
        });

        workbox.messageSkipWaiting();
      }
    };

    if (promptState.accepted) {
      reloadWhenReady();
    }
  }, [workbox, promptState.accepted]);

  const handleAccept = useCallback(() => {
    setPromptState({
      accepted: true,
      showPrompt: false
    });
  }, []);

  const handleReject = useCallback(() => {
    setPromptState((previousState) => ({
      ...previousState,
      showPrompt: false
    }));
  }, []);

  const showSkipWaitingPrompt = useCallback(() => {
    if (promptBeforeSkipWaiting) {
      setPromptState({
        accepted: false,
        showPrompt: true
      });
    } else {
      handleAccept();
    }
  }, [handleAccept, promptBeforeSkipWaiting]);

  const checkForUpdates = useCallback(() => {
    if (registration) {
      setIsCheckingForUpdates(true);
      registration.update().finally(() => {
        setIsCheckingForUpdates(false);
      });
    } else if (config?.app.enableSW) {
      console.warn(
        'workbox.checkForUpdates: no service worker registration found, skipping update'
      );
    }
  }, [registration, config?.app.enableSW]);

  useEffect(() => {
    const registerWorkbox = async () => {
      if ('serviceWorker' in navigator) {
        const workbox = new Workbox(serviceWorkerFileName);

        workbox.addEventListener('waiting', () => {
          showSkipWaitingPrompt();
        });

        workbox.addEventListener('redundant', (event) => {
          if (!event.isUpdate || event.isExternal) {
            reload();
          }
        });

        // workbox.addEventListener('installed', (event) => {
        //   console.info('workbox.installed', event.isUpdate, event.isExternal, event);
        // });

        // workbox.addEventListener('activated', (event) => {
        //   console.info('workbox.activated', event.isUpdate, event.isExternal, event);
        // });

        const registration = await workbox.register();
        setRegistration(registration);
        setWorkbox(workbox);
      }
    };

    if (config?.app.enableSW) {
      registerWorkbox();
    }
  }, [config?.app.enableSW, handleAccept, showSkipWaitingPrompt, serviceWorkerFileName]);

  return (
    <WorkboxContext.Provider
      {...props}
      value={{
        checkForUpdates,
        isCheckingForUpdates,
        registration,
        shouldShowPromptBeforeSkipWaiting: promptState.showPrompt
      }}
    >
      {children}
      {promptState.showPrompt && (
        <WorkboxSkipWaitingPrompt onAccept={handleAccept} onReject={handleReject} />
      )}
    </WorkboxContext.Provider>
  );
};

WorkboxProvider.propTypes = {
  children: PropTypes.node,
  /**
   * Opt-in flag to prompt users before reloading the page
   * @see https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
   */
  promptBeforeSkipWaiting: PropTypes.bool,
  serviceWorkerFileName: PropTypes.string
};

WorkboxProvider.defaultProps = {
  promptBeforeSkipWaiting: false,
  serviceWorkerFileName: '/sw.js'
};

export default WorkboxProvider;
