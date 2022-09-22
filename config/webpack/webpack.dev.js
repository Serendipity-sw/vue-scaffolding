const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.conf')
const webpack = require('webpack')

let config = merge(baseWebpackConfig, {
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path]__[name]__[local]--[hash:base64:12]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      Gloomy_env: JSON.stringify('development')
    })
  ]
})

module.exports = config
