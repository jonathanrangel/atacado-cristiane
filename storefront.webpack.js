const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),
      './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/js/CartItem.js'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/js/TheProduct.js'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.html')
    }
  }
})