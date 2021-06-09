import PropTypes from 'prop-types';

import { ConfigurationProvider } from './ConfigurationContext';
import { WorkboxProvider } from './WorkboxContext';

const ApplicationContextProvider = ({ config, ...props }) => (
  <ConfigurationProvider config={config}>
    <WorkboxProvider promptBeforeSkipWaiting={false} serviceWorkerFileName="/sw.js" {...props} />
  </ConfigurationProvider>
);

ApplicationContextProvider.propTypes = {
  config: PropTypes.object
};

export default ApplicationContextProvider;
