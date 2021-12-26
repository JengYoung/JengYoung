const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => ({
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.png|svg$/, // .png 확장자로 마치는 모든 파일
        loader: 'file-loader',
        options: {
          publicPath: './dist/', // prefix를 아웃풋 경로로 지정
          name: '[name].[ext]?[hash]', // 파일명 형식
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader', // url 로더를 설정한다
          options: {
            publicPath: './dist/', // file-loader와 동일
            name: '[name].[ext]?[hash]', // file-loader와 동일
            limit: 10000, // 10kb 미만 파일만 data url로 처리
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `${env.client ? 'client' : 'server'}.env`,
    }),
    new HtmlPlugin({
      template: './index.html',
      hash: true,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
  ],
  devtool: 'source-map',
  mode: 'none',
});
