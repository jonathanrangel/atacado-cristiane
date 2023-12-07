// Add your custom JavaScript for checkout here.
window.ECOM_CONFIG = {
  default_img_size: 'big'
}

if (window.location.href.includes('account') && !window.location.href.includes('orders')) {
  window.location = '/'
}