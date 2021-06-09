import fs from 'fs';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin';
import { config } from 'dotenv';
import DotenvPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { extendDefaultPlugins } from 'svgo';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import { SubresourceIntegrityPlugin } from 'webpack-subresource-integrity';
import WorkboxPlugin from 'workbox-webpack-plugin';

// Load environment variables to process.env
config({
  path: '.env'
});

export const PUBLIC_FOLDER = path.resolve(__dirname, 'public');
export const SRC_FOLDER = path.resolve(__dirname, 'src');
export const ASSETS_FOLDER = path.resolve(SRC_FOLDER, 'assets');
export const SVGR_FOLDER = path.resolve(ASSETS_FOLDER, 'svgr');
export const BUILD_FOLDER = path.resolve(__dirname, 'dist');
export const REPORTS_FOLDER = path.resolve(__dirname, 'reports');

/**
 * Base config: rules that apply to both development and production
 * It is not meant to be used directly, but extended for the use-case
 */
const coreConfiguration = {
  /**
   * Main entry file
   * @see https://webpack.js.org/concepts/entry-points/
   */
  entry: path.resolve(SRC_FOLDER, 'index.jsx'),
  resolve: {
    alias: {
      src: SRC_FOLDER
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.mjs',
      '.json',
      '.wasm',
      '.gql',
      '.graphql',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.woff',
      '.woff2'
    ]
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgAttributes: {
                fill: 'currentColor'
              },
              svgoConfig: {
                multipass: true,
                pretty: process.env.NODE_ENV === 'development',
                plugins: [
                  { sortAttrs: true },
                  { removeViewBox: false },
                  { removeDimensions: true },
                  { convertColors: { currentColor: true } }
                ]
              }
            }
          }
        ],
        include: SVGR_FOLDER,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|woff2?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[name].[ext]',
              outputPath: 'assets/static'
            }
          }
        ],
        include: ASSETS_FOLDER,
        exclude: [/node_modules/, SVGR_FOLDER]
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      safe: false, // we might not need all parameters to be defined in all environments
      systemvars: true // only load vars from '.env' file if they are NOT already defined as env variables
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PUBLIC_FOLDER, // Copy all public assets (favicons, splash etc.)
          to: BUILD_FOLDER
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_FOLDER, 'index.html'),
      path: BUILD_FOLDER,
      filename: 'index.html',
      hash: false, // Do not enable: hash conflicts with ServiceWorker cache!
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CspHtmlWebpackPlugin(
      {
        'default-src': "'none'",
        'script-src': ["'self'", 'https://storage.googleapis.com/', 'https://polyfill.io/'],
        'style-src': [
          "'self'",
          'https://unpkg.com/',
          // CSS-in-JS libraries inject inline <style> tags
          "'unsafe-inline'"
        ],
        'img-src': ["'self'", 'data:'],
        'font-src': "'self'",
        'media-src': "'self'",
        'manifest-src': "'self'",
        'worker-src': "'self'",
        'connect-src': "'self'",
        'object-src': "'none'",
        'frame-src': "'self'",
        'base-uri': "'none'"
      },
      {
        enabled: true,
        hashingMethod: 'sha256',
        hashEnabled: {
          'script-src': true,
          'style-src': true
        },
        nonceEnabled: {
          'script-src': true,
          // CSS-in-JS libraries inject inline <style> tags
          'style-src': false
        }
      }
    )
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  stats: {
    preset: 'normal',
    env: true,
    errorDetails: true
  }
};

/**
 * Development config based on webpack-dev-server
 * @see https://webpack.js.org/guides/development/
 */
const developmentConfiguration = merge(coreConfiguration, {
  mode: 'development',
  output: {
    clean: true,
    chunkFilename: '[name].chunk.js',
    crossOriginLoading: 'anonymous',
    filename: '[name].js',
    path: BUILD_FOLDER,
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    historyApiFallback: true,
    hot: true,
    host: process.env.DEV_SERVER_HOST || 'localhost',
    /**
     * Local HTTPS support: will load certificates if provided
     * @see https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/
     */
    https:
      process.env.DEV_SERVER_HTTPS_KEY && process.env.DEV_SERVER_HTTPS_CERT
        ? {
            key: fs.readFileSync(process.env.DEV_SERVER_HTTPS_KEY),
            cert: fs.readFileSync(process.env.DEV_SERVER_HTTPS_CERT),
            cacert: process.env.DEV_SERVER_HTTPS_CA
              ? fs.readFileSync(process.env.DEV_SERVER_HTTPS_CA)
              : undefined
          }
        : false,
    port: process.env.DEV_SERVER_PORT || 1234,
    static: [
      {
        directory: BUILD_FOLDER,
        publicPath: '/',
        serveIndex: true,
        watch: true
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8888
    // })
  ],
  optimization: {
    emitOnErrors: false,
    minimize: false,
    moduleIds: 'named'
  },
  performance: {
    hints: 'warning'
  }
});

/**
 * Production config: optimised for general performances
 * You might still need to adjust it before launching your application in production
 * @see https://webpack.js.org/guides/production/
 */
const productionConfiguration = merge(coreConfiguration, {
  mode: 'production',
  output: {
    clean: true,
    chunkFilename: '[chunkhash].chunk.js?v=[fullhash]',
    crossOriginLoading: 'anonymous',
    filename: '[contenthash].js?v=[fullhash]',
    path: BUILD_FOLDER,
    publicPath: '/'
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: extendDefaultPlugins([
                {
                  name: 'removeViewBox',
                  active: false
                }
              ])
            }
          ]
        ]
      },
      exclude: /node_modules/
    }),
    new SubresourceIntegrityPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      compressionOptions: {
        level: 9
      },
      deleteOriginalAssets: false,
      filename: '[path][base].gz[query]',
      minRatio: 0.8,
      test: /\.(js|css|html|txt|xml|json|md|ico|jpe?g|png|gif|webp|svg|woff2?|webapp|webmanifest)$/,
      threshold: 1024
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      compressionOptions: {
        quality: 11,
        mode: 0
      },
      deleteOriginalAssets: false,
      filename: '[path][base].br[query]',
      minRatio: 0.8,
      test: /\.(js|css|html|txt|xml|json|md|ico|jpe?g|png|gif|webp|svg|woff2?|webapp|webmanifest)$/,
      threshold: 1024
    }),
    new WorkboxPlugin.GenerateSW({
      cleanupOutdatedCaches: true,
      clientsClaim: false,
      skipWaiting: false,
      directoryIndex: 'index.html',
      swDest: 'sw.js',
      exclude: [/\.map$/, /^manifest.*\.js$/, 'sw.js'],
      runtimeCaching: [
        {
          urlPattern:
            /\.(?:js|css|txt|xml|json|md|ico|jpe?g|png|gif|webp|svg|woff2?|webapp|webmanifest)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.resolve(REPORTS_FOLDER, `build-report_${new Date().getTime()}.html`)
    })
  ],
  optimization: {
    concatenateModules: true,
    sideEffects: true,
    minimize: true,
    moduleIds: 'deterministic'
  },
  performance: {
    hints: 'warning'
  },
  stats: 'errors-warnings'
});

/**
 * Dynamic webpack configuration based on enviroment (development vs production)
 *
 * @return webpack.Configuration
 */
const getWebpackConfiguration = (_env, args) => {
  const { mode } = args;

  switch (mode) {
    case 'development':
      return developmentConfiguration;
    case 'production':
      return productionConfiguration;
    default:
      throw new Error(`Unable to provide configuration for unknown environment: "${mode}"`);
  }
};

export default getWebpackConfiguration;
