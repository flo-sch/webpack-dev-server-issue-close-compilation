module.exports = {
  extends: ['stylelint-config-prettier'],
  ignoreFiles: ['dist', 'node_modules'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [true, {}]
  }
};
