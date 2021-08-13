const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const open = require('open');
const Webpack = require('webpack');
const WebpackBar = require('webpackbar');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/main.ts',
  output: {
    charset: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: './js/[hash].[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path]__[name]__[local]--[hash:base64:12]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: './static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        loader: 'file-loader',
        options: {
          name: './static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { babelrc: true },
          },
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: 'advanced',
        },
      }),
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        test: /.js$/,
        workerCount: 2,
        uglifyJS: {
          output: {
            beautify: false,
            comments: false,
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),  打包优化检查
    new WebpackBar({}),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'ceshi',
      template: path.resolve(__dirname, '../../template.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[hash].[name].css',
    }),
    new EncodingPlugin({
      encoding: 'UTF-8',
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: false,
    after() {
      open('http://localhost:' + this.port);
    },
  },
};
