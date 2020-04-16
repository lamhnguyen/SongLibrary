const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; // let Babel know if optimization is needed

module.exports = {
  mode: "development", // disable some production only features
  target: "web",
  devtool: "cheap-module-source-map", // let us see the original source code (vs transpiled) in brower when debugging
  entry: "./src/index", // app's entry point
  // not really needed in development env, but required
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    stats: "minimal", // reduces the information written to the command line (less verbose)
    overlay: true, // overlay any errors that occur in the browser
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    // define global constants at the compile time (dev vs prod)
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"), // mock API
    }),
    // generate an HTML5 file that includes all webpack bundles
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    // tell webpack how to handle each file type
    rules: [
      // JS and JSV files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // exclude external modules
        use: ["babel-loader", "eslint-loader"], // run Babel and Lint
      },
      // CSS files
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
