const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const { ProvidePlugin } = require("webpack");

const federationConfig = {
  name: "app2",
  library: { type: "var", name: "app2" },
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/Button",
  },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } },
};

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-typescript", "@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new ProvidePlugin({
      React: "react",
    }),
    new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({
      federationConfig,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
