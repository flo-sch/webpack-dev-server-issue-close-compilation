import { createContext } from 'react';

const WorkboxContext = createContext({
  checkForUpdates: () => {},
  isCheckingForUpdates: false,
  registration: undefined,
  shouldShowPromptBeforeSkipWaiting: false
});

export default WorkboxContext;
