const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const EncodingPlugin = require( 'webpack-encoding-plugin' );
const ParallelUglifyPlugin = require( 'webpack-parallel-uglify-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const path = require( 'path' );
const WebpackBar = require( 'webpackbar' );
const CompressionWebpackPlugin = require( 'compression-webpack-plugin' )
const TerserPlugin = require( "terser-webpack-plugin" )
const portFinderSync = require( 'portfinder-sync' )
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const DashboardPlugin = require( 'webpack-dashboard/plugin' );
const webpack = require( 'webpack' )

module.exports = {
  entry: './src/main.ts',
  output: {
    charset: true,
    path: path.resolve( __dirname, '../../dist' ),
    filename: './js/[name].[chunkhash].js',
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
            options: { appendTsSuffixTo: [ /\.vue$/ ] },
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
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ParallelUglifyPlugin( {
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
      } ),
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
      '@': path.resolve( 'src' ),
    },
  },
  plugins: [
    new WebpackBar( {} ),
    new ESLintPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin( {
      template: path.resolve( __dirname, '../../template.html' ),
      filename: 'index.html',
      inject: 'body',
    } ),
    new MiniCssExtractPlugin( {
      filename: './css/[name].[chunkhash].css',
    } ),
    new EncodingPlugin( {
      encoding: 'UTF-8',
    } ),
    new CompressionWebpackPlugin( {
      algorithm: 'gzip'
    } ),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    port: portFinderSync.getPort( 3000 ),
    hot: false,
    open: true,
    client: {
      overlay: true,
      progress: true
    }
  },
};
