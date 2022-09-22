const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')
const WebpackBar = require('webpackbar')
const portFinderSync = require('portfinder-sync')

module.exports = {
  entry: './src/main.ts',
  output: {
    charset: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: './js/[name].[chunkhash].js',
    clean: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../../src/'),
      '@': path.resolve('src')
    },
    extensions: ['.js', '.ts', '.vue', '.jsx', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          'cache-loader',
          'thread-loader',
          'babel-loader'
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {babelrc: true},
          },
          {
            loader: 'ts-loader',
            options: {appendTsSuffixTo: [/\.vue$/]},
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        },
        generator: {
          // 打包到 image 文件下
          filename: './images/[contenthash][ext][query]',
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        },
        generator: {
          // 打包到 image 文件下
          filename: './images/[contenthash][ext][query]',
        }
      }
    ],
  },
  plugins: [
    new WebpackBar({}),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../template.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      },
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[chunkhash].css',
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: portFinderSync.getPort(3000),
    hot: true,
    open: true,
    client: {
      overlay: true,
      progress: true
    }
  },
}
