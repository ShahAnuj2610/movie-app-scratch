// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => null;
}

const NextWorkboxPlugin = require('next-workbox-webpack-plugin'); // eslint-disable-line
const withCSS = require('@zeit/next-css'); // eslint-disable-line
const WebpackPwaManifest = require('webpack-pwa-manifest'); // eslint-disable-line
const path = require('path'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const { parsed: localEnv } = require('dotenv').config(); // eslint-disable-line
const withTM = require('next-transpile-modules');

module.exports = withTM(
  withCSS({
    transpileModules: ['antd'],
    webpack(config, { isServer, buildId, dev }) {
      // eslint-disable-next-line
      config.node = {
        fs: 'empty',
      };

      const workboxOptions = {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['.next/static/*', '.next/static/chunks/*', '.next/static/css/*'],
        modifyUrlPrefix: {
          '.next': '/_next',
        },
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: /[^3]\/product\//,
            handler: 'networkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: /[^3]\/search\//,
            handler: 'networkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: new RegExp('^https://scalr.api.appbase.io/movies-store-app/_msearch'),
            handler: 'staleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: 'cacheFirst',
            options: {
              cacheName: 'image-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      };
      if (!isServer && !dev) {
        config.plugins.push(
          new NextWorkboxPlugin({
            buildId,
            ...workboxOptions,
          }),
          new WebpackPwaManifest({
            filename: 'static/manifest.json',
            name: 'Movies Store',
            short_name: 'Movies Store',
            description: 'A Movie store to browse and watch movies',
            background_color: '#ffffff',
            theme_color: '#17181B',
            display: 'standalone',
            orientation: 'portrait',
            fingerprints: false,
            inject: false,
            start_url: '/',
            ios: {
              'apple-mobile-web-app-title': 'Movies Store',
              'apple-mobile-web-app-status-bar-style': '#17181B',
            },
            icons: [
              {
                src: path.resolve('static/icon.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: '/static',
              },
            ],
            includeDirectory: true,
            publicPath: '..',
          }),
        );
      }
      return config;
    },
    env: localEnv,
  }),
);
