const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),
      './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/js/CartItem.js'),
      './js/LoginBlock.js': path.resolve(__dirname, 'template/js/custom-js/js/LoginBlock.js'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/js/TheProduct.js'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.html'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/html/APrices.html'),
      './js/APrices.js': path.resolve(__dirname, 'template/js/custom-js/js/APrices.js'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'),
    }
  }
})