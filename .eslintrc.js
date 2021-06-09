module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    module: true,
    process: true,
    window: true
  },
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [
    '@emotion',
    'import',
    'html',
    'jsx-a11y',
    'prettier',
    'promise',
    'react',
    'react-hooks'
  ],
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.', 'src'],
        extensions: ['.js', '.jsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@emotion/jsx-import': 'error',
    '@emotion/pkg-renaming': 'error',
    'func-names': ['error', 'never'],
    'import/no-unresolved': [2, { caseSensitive: true, commonjs: true }],
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': [
      1,
      {
        forbid: ['any']
      }
    ],
    'react/jsx-closing-tag-location': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-uses-react': 'off',
    'react/no-access-state-in-setstate': 0,
    'react/no-did-mount-set-state': 0,
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
