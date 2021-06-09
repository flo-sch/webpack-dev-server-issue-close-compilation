import PropTypes from 'prop-types';

import ConfigurationContext from './ConfigurationContext';

const ConfigurationProvider = ({ config, ...props }) => (
  <ConfigurationContext.Provider
    {...props}
    value={{
      // Make sure to implement everything defined in the context file
      config
    }}
  />
);

ConfigurationProvider.propTypes = {
  config: PropTypes.object
};

export default ConfigurationProvider;
