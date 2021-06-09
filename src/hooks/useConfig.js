import { useContext } from 'react';

import { ConfigurationContext } from 'contexts/ConfigurationContext';

const useConfig = () => {
  const { config } = useContext(ConfigurationContext);

  return config;
};

export default useConfig;
