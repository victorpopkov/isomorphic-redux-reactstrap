import { serverConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import baseConfiguration from './webpack.config.prod';
import settings from './universal-webpack-settings';

const config = serverConfiguration(baseConfiguration, settings);

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __CLIENT__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __DISABLE_SSR__: false,
    __SERVER__: true,
  }),
);

module.exports = config;
