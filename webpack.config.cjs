const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/pokemon-react-app/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-refresh/babel'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: {
      index: '/pokemon-react-app/index.html',
      disableDotRule: true,
    },
    compress: true,
    hot: true,
    port: 3002,
    open: ['/pokemon-react-app/'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './public/404.html',
      inject: false,
    }),
    new ReactRefreshWebpackPlugin(),
  ],
}
