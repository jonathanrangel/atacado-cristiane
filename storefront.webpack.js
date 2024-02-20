const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),
      './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/js/CartItem.js'),
      './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/html/TheCart.html'),
      './js/TheCart.js': path.resolve(__dirname, 'template/js/custom-js/js/TheCart.js'),
      './js/LoginBlock.js': path.resolve(__dirname, 'template/js/custom-js/js/LoginBlock.js'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/js/TheProduct.js'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.html'),
      './html/ProductVariations.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductVariations.html'),
      './js/ProductVariations.js': path.resolve(__dirname, 'template/js/custom-js/js/ProductVariations.js'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'),
      './html/LoginModal.html': path.resolve(__dirname, 'template/js/custom-js/html/LoginModal.html'),
      './html/TheAccount.html': path.resolve(__dirname, 'template/js/custom-js/html/TheAccount.html'),
      './js/TheAccount.js': path.resolve(__dirname, 'template/js/custom-js/js/TheAccount.js'),
      './js/QuantitySelector.js': path.resolve(__dirname, 'template/js/custom-js/js/QuantitySelector.js')
    }
  }
})