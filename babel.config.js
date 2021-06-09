module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: false,
        loose: true,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        importSource: 'theme-ui',
        runtime: 'automatic',
        throwIfNamespace: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    '@loadable/babel-plugin',
    [
      'module-resolver',
      {
        root: ['./src']
      }
    ],
    [
      '@emotion',
      {
        autoLabel: 'dev-only',
        cssPropOptimization: true,
        labelFormat: '[filename]--[local]'
      }
    ]
  ],
  env: {
    // special env for webpack to load its eS6 config
    webpack: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'auto'
          }
        ]
      ]
    },
    // special env for babel-jest
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ],
      plugins: ['dynamic-import-node']
    }
    // special env for production build
    // production: {}
  }
};
