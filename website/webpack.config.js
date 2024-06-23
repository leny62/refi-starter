const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const CustomEnv = require('custom-env').env(true, '../conf');

module.exports = {
  mode: "development",
  output: {
    publicPath: "/",
    filename: "assets/website/js/main.[contenthash].js",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/website/css/main.[contenthash].css",
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
      path: '../partials/analytics.html',
      location: 'head',
      priority: 'high', template_filename: '*',
      options: {
      }
    }),
    // new HtmlWebpackPartialsPlugin({
    //   path: 'src/partials/webpush.html',
    //   location: 'head',
    //   priority: 'low', template_filename: '*',
    // }),
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, "src")],
      loader: "babel-loader",
    },
    {
      test: /.(sa|sc|c)ss$/,
      use: [{
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
        filename: "assets/website/[hash][ext][query]",
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "assets/website/fonts/[hash][ext][query]",
      },
    },
    ],
  },

  devServer: {
    open: true,
    host: "localhost",
  },
};