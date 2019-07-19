/* eslint-disable global-require */
const path = require('path');
const ImageminPlugin = require('imagemin-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 9000,
    open: false,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff2|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.(png|svg|jpg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
            },
          },
          {
            loader: ImageminPlugin.loader,
            options: {
              bail: false, // Ignore errors on corrupted images
              cache: true,
              imageminOptions: {
                plugins: ['mozjpeg', 'optipng', 'svgo'],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Beagles ⸺ Home',
      template: './src/pages/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Beagles ⸺ Dates',
      template: './src/pages/dates.html',
      filename: 'dates.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Beagles ⸺ Contact',
      template: './src/pages/contact.html',
      filename: 'contact.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
