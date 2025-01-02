const webpack = require('webpack');
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // Definiše alias za "src" direktorij
      }
    },
    plugins: [
      // Postojeći DefinePlugin za feature flags
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false // Zadržava postojeću konfiguraciju
      })
    ]
  }
};
