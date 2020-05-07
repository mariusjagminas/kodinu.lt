const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      scriptLoading: 'defer',
      minify: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};
