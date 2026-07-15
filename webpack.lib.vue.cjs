const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

// Build dédié à l'export `./vue` (composants Vue bruts).
// Contrairement à webpack.lib.cjs (index/register/styles), Vue est externalisé ici :
// ce bundle est consommé par une appli Vue qui apporte déjà sa propre instance de Vue,
// alors que index.js/register.js doivent rester autonomes pour un usage Twig/HTML sans npm.
module.exports = {
  mode: 'production',
  target: ['web', 'es2020'],
  entry: {
    vue: './src/lib/vue.ts',
  },
  externals: {
    vue: 'vue',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    library: {
      type: 'commonjs-static',
    },
  },
  optimization: {
    splitChunks: false,
    runtimeChunk: false,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                loadPaths: [path.resolve(__dirname, 'src/styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    }),
  ],
};
