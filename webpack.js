const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: false
  },
  resolve: {
    modules: [path.resolve(__dirname + "/src"), path.resolve(__dirname + "/node_modules")]
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.csv$/i,
        use: "raw-loader"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin({ filename: "[name]/source.css" })],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/")
  }
};
