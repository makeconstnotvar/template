let webpack = require("webpack");
let path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "development",
    devtool: "source-map",
    plugins: [
      //new BundleAnalyzerPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
    ],
    entry: {
      admin: "./src/admin/index.tsx",
      reports: "./src/reports/index.tsx",
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name]/scripts/script.js"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", '.js'],
      modules: [
        "./node_modules",
        "./src"
      ]
    },
    stats: {
      modules: false,
    }
};
