/* eslint-disable global-require, import/no-extraneous-dependencies */
require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const babelLoaderConfig = require('./babel-loader.config');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

// paths
const pathRoot = path.resolve(__dirname, '..');
const pathSrc = path.resolve(__dirname, '../src');
const pathBuild = path.resolve(__dirname, '../build');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
// when running concurrently, I had some 'You must specify "assets" parameter' issues without
// removing the require cache first.
delete require.cache[require.resolve('./webpack-isomorphic-tools')];
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'inline-source-map',
  context: pathRoot,
  entry: {
    vendor: [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'bootstrap-loader',
      path.join(pathSrc, 'assets/scss/vendor.scss'),
    ],
    main: [
      path.join(pathSrc, 'client.js'),
    ],
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: pathBuild,
    publicPath: `http://${host}:${port}/`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: babelLoaderConfig.query,
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              includePaths: [],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.join(pathSrc, 'assets/scss/sass-resources.scss'),
            },
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'font/woff2',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-sfnt',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/vnd.ms-fontobject',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.otf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-sfnt',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]',
              outputPath: './assets/images/',
            },
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
      {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
              outputPath: './assets/images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    alias: {
      '@Config': path.resolve(pathSrc, './config.js'),
      '@Components': path.resolve(pathSrc, './components'),
      '@Containers': path.resolve(pathSrc, './containers'),
      '@Helpers': path.resolve(pathSrc, './helpers'),
      '@ReduxActions': path.resolve(pathSrc, './redux/actions'),
      '@ReduxConstants': path.resolve(pathSrc, './redux/constants'),
      '@ReduxEvents': path.resolve(pathSrc, './redux/events'),
      '@ReduxMiddlewares': path.resolve(pathSrc, './redux/middlewares'),
      '@ReduxReducers': path.resolve(pathSrc, './redux/reducers'),
      '@ReduxStores': path.resolve(pathSrc, './redux/stores'),
      '@ReduxUtils': path.resolve(pathSrc, './redux/utils'),
    },
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    webpackIsomorphicToolsPlugin,
  ],
};
