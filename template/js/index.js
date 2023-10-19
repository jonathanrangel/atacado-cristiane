import '#template/js/'
import './custom-js/pages'
import ecomCart from '@ecomplus/shopping-cart'
import { fetchCart, fetchingCartId, upsertCart } from '@ecomplus/storefront-app/src/lib/sync-cart-to-api'
upsertCart().then(() => {
    ecomCart.on('change', () => {
        upsertCart()
    })
})
