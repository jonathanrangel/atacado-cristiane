// Add your custom JavaScript for checkout here.
window.ECOM_CONFIG = {
  default_img_size: 'big'
}

if (window.sessionStorage.getItem('ecomUtm')) {
  window.localStorage.setItem('ecomUtm', window.sessionStorage.getItem('ecomUtm'))
}

if (window.localStorage.getItem('ecomUtm') && !window.sessionStorage.getItem('ecomUtm')) {
  window.sessionStorage.setItem('ecomUtm', window.sessionStorage.getItem('ecomUtm'))
}
