// @ts-check
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const { ProvidePlugin } = require("webpack");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
require("dotenv").config();

const getFederationConfig = () => {
  return {
    name: "app1",
    filename: "mainEntry.js",
    remotes: {
      app2: `app2@${process.env.APP2_URL}/app2Entry.js`,
    },
    shared: { react: { singleton: true }, "react-dom": { singleton: true } },
  };
};

module.exports = () => ({
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
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
    new ModuleFederationPlugin(getFederationConfig()),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ].concat(
    process.env.NODE_ENV === "development"
      ? [
          new FederatedTypesPlugin({
            federationConfig: {
              ...getFederationConfig(),
              remotes: {
                app2: `app2@${process.env.APP2_URL}/app2Entry.js`,
              },
            },
          }),
        ]
      : []
  ),
});
