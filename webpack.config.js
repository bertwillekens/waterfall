/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/main.tsx',
    output: {
      filename: 'demotool.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'DemoTool',
      libraryTarget: 'umd',
      publicPath: '/dist/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          // See .babelrc for further babel config
        },
      ],
    },
    optimization: isProduction ? {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }: {},
    plugins: [
      ...(isProduction ? [new BundleAnalyzerPlugin()]: []),
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js'],
        exclude: 'node_modules'
      })
    ],
    performance: isProduction
    ? {
        hints: 'warning',
        maxAssetSize: 300000, // 300KB
        maxEntrypointSize: 300000, // 300KB
      }
    : {
        hints: false, // Suppress size warnings
      },
    devServer: {
      static: {
        directory: path.join(__dirname, 'test'),
      },
      compress: true,
      port: 9000,
      hot: true, // Enable hot module replacement
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        }
      }
    }
  };
};