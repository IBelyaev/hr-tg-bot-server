const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/client/index.tsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      { 
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './',
                },
            },
            {
               loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: './postcss.config.js',
                  },
                }
            }
        ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin(),
  ]
}