const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@common': path.resolve(__dirname, 'src/modules/common'),
      '@api': path.resolve(__dirname, 'src/modules/api'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
};