import '#template/js/'
import './custom-js/pages'
import ecomCart from '@ecomplus/shopping-cart'
import { fetchCart, fetchingCartId, upsertCart } from '@ecomplus/storefront-app/src/lib/sync-cart-to-api'
ecomCart.on('change', () => {
    window.location = '/app/#/cart/'
})
/* upsertCart().then(() => {
    ecomCart.on('change', () => {
        upsertCart()
    })
})

if (ecomCart.data.) {
    fetchCart(params.id)
  }
  fetchingCartId.then(id => {
    if (params.id !== id && router.currentRoute.name === name) {
      router.push({
        name,
        params: { ...params, id }
      })
      const { hostname, href } = window.location
      if (/\.[a-z]+$/.test(hostname)) {
        ecomCart.data.permalink = href
        setTimeout(upsertCart, 500)
      }
    }
  }) */