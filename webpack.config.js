const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

module.exports = {
  mode: "production", // Use production mode for deployment
  output: {
    publicPath: "/",
    filename: "js/main.[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/main.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/favicons',
          to: 'assets',
        },
      ],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.resolve(__dirname, 'partials/analytics.html'),
      location: 'head',
      priority: 'high',
      template_filename: '*',
      options: {}
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
      },
      {
        test: /.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4|webm)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]", // Ensure images are placed in the assets/images directory
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  performance: {
    hints: false
  }
};
