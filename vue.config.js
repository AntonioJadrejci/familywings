const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      // Define feature flags
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false // Set it to true if needed
      })
    ]
  }
};