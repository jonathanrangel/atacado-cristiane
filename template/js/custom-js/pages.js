// Add your custom JavaScript for storefront pages here.
window.$ecomConfig.set('default_img_size', 'zoom')
if (window.ecomCart && window.ecomCart.data && window.ecomCart.data.items && window.storefront && window.storefront.context && window.storefront.context.resource === 'products') {
    const product = window.storefront.context.body
    const checkProduct = window.ecomCart.data.items.find(item => item.product_id === product._id)
    if (checkProduct) {
        console.log(checkProduct)
    }
}

if (!window.sessionStorage.getItem('buyTimer')) {
    window.sessionStorage.setItem('buyTimer', JSON.stringify({ date: new Date(), cart: 0 }))
}