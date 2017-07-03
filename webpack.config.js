const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const __DEV__ = ENV === 'development';
const __PROD__ = ENV === 'production';

const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__
});

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'redux',
  'redux-thunk'
];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: __DEV__ ? 'scripts/[name].js' : 'scripts/[name].[chunkhash].js',
    publicPath: '/'
  },

  devtool: __DEV__ ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [require('babel-plugin-transform-class-properties')],
            presets: [
              'babel-preset-react',
              ['babel-preset-env', {
                modules: false
              }]
            ]
          }
        }
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules\/bootstrap-saas/,
        loader: extractStyles.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: __DEV__,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                minimize: __DEV__ ? false : {
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions'],
                  },
                  discardComments: {
                    removeAll : true,
                  },
                  discardUnused: false,
                  mergeIdents: false,
                  reduceIdents: false,
                  safe: true,
                  sourcemap: __DEV__,
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: __DEV__
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    extractStyles,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
      }
    })
  ]
};

// Fonts loaders
[
  {ext: 'woff', type: 'application/font-woff'},
  {ext: 'woff2', type: 'application/font-woff2'},
  {ext: 'otf', type: 'font/opentype'},
  {ext: 'ttf', type: 'application/octet-stream'},
  {ext: 'eot', type: 'application/vnd.ms-fontobject'},
  {ext: 'svg', type: 'image/svg+xml'}
].forEach(font => {
  config.module.rules.push({
    test : new RegExp(`\\.${font.ext}$`),
    use: {
      loader : 'url-loader',
      options : {
        name : 'fonts/[name].[ext]',
        limit : 10000,
        mimetype: font.type
      }
    }
  })
})

if (__DEV__) {
  const DashboardPlugin = require('webpack-dashboard/plugin');

  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin({ port: 9001 })
  )
}

if (__PROD__) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: __DEV__,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    })
  )
}

module.exports = config;
