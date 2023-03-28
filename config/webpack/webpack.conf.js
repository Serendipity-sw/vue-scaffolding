const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')
const WebpackBar = require('webpackbar')

module.exports = {
  entry: './src/main.ts',
  output: {
    charset: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: './js/[name].[chunkhash].js',
    clean: true
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
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          'cache-loader',
          'thread-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {babelrc: true}
          },
          {
            loader: 'ts-loader',
            options: {appendTsSuffixTo: [/\.vue$/]}
          }
        ]
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
            maxSize: 25 * 1024 // 25kb
          }
        },
        generator: {
          // 打包到 image 文件下
          filename: './images/[contenthash][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024 // 25kb
          }
        },
        generator: {
          // 打包到 image 文件下
          filename: './images/[contenthash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new WebpackBar({
      color: "#85d",
      basic: false,
      profile: false
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../template.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      },
      inject: 'body'
    })
  ]
}
