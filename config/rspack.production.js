const rspack = require('@rspack/core');
const path = require("path");

module.exports = () => {
  return {
    output: {
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/",
      filename: "[name].[contenthash].bundle.js",
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            {
              // inject CSS to page
              loader: "style-loader",
            },
            {
              // translates CSS into CommonJS modules
              loader: "css-loader",
            },
            {
              // Run postcss actions
              loader: "postcss-loader",
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [require("autoprefixer")];
                  },
                },
              },
            },
            {
              // compiles Sass to CSS
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
                sassOptions: {
                  quietDeps: true,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new rspack.CssExtractRspackPlugin({
        filename: "styles/[name].[contenthash].css",
        chunkFilename: "[id].css",
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new rspack.SwcCssMinimizerRspackPlugin(),
        new rspack.SwcJsMinimizerRspackPlugin({
          exclude: /webcomponentapp.js/,
          minimizerOptions: {
            compress: {
              drop_console: true,
            },
          }
        }),
      ],
      runtimeChunk: {
        name: "runtime",
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
