const path = require('path');

// Build dédié à l'export `./motion` (couche d'animation GSAP optionnelle).
// vue ET gsap sont externalisés : le consommateur apporte ses propres instances
// (gsap est une peer dependency optionnelle, jamais bundlée ici pour permettre la
// déduplication et n'imposer son poids qu'aux projets qui utilisent ce sous-chemin).
module.exports = {
  mode: 'production',
  target: ['web', 'es2020'],
  entry: {
    motion: './src/lib/motion.ts',
  },
  externals: {
    vue: 'vue',
    gsap: 'gsap',
    'gsap/Flip': 'gsap/Flip',
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
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
};
