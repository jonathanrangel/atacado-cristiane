import {
    i19checkout,
    i19continueShopping,
    i19discount,
    i19emptyCart
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    formatMoney
  } from '@ecomplus/utils'
  
  import ecomCart from '@ecomplus/shopping-cart'
  import vSelect from 'vue-select'
  import APrices from '@ecomplus/storefront-components/src/APrices.vue'
  import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'
  import DiscountApplier from '@ecomplus/storefront-components/src/DiscountApplier.vue'
  import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'
  import EarnPointsProgress from '@ecomplus/storefront-components/src/EarnPointsProgress.vue'
  import RecommendedItems from '@ecomplus/storefront-components/src/RecommendedItems.vue'
  
  export default {
    name: 'TheCart',
  
    components: {
      APrices,
      CartItem,
      DiscountApplier,
      ShippingCalculator,
      EarnPointsProgress,
      RecommendedItems,
      vSelect
    },
  
    props: {
      amount: {
        type: Object,
        default () {
          return {}
        }
      },
      checkoutUrl: {
        type: String,
        default: '/app/#/checkout'
      },
      zipCode: String,
      discountCoupon: String,
      modulesPayload: Object,
      ecomCart: {
        type: Object,
        default () {
          return ecomCart
        }
      }
    },
  
    data () {
      return {
        localZipCode: this.zipCode,
        canApplyDiscount: false,
        isCouponApplied: false,
        books: [
            { title: "--" },
            { title: "Sandy" },
            { title: "Bruna" }
            
        ],
        seller: null,
        quantityToBuy: 3
      }
    },
  
    computed: {
      i19checkout: () => i18n(i19checkout),
      i19continueShopping: () => i18n(i19continueShopping),
      i19discount: () => i18n(i19discount),
      i19emptyCart: () => i18n(i19emptyCart),
  
      cart () {
        return this.ecomCart.data
      },

      utmSetter: {
        get () {
          const storageKey = 'ecomUtm'
          const utm = JSON.parse(sessionStorage.getItem(storageKey)) || {}
          const source = utm['source']
          const campaign = utm['campaign']
          if (source && source.toLowerCase() === 'atendimento' && campaign) {
            return campaign
          }
          return utm.term
        },
        set (seller) {
          this.seller = seller
        }
        
      },

      quantityCart () {
        return this.cart && this.cart.items && this.cart.items.length && this.cart.items.reduce((acc, curr) => acc + curr.quantity, 0)
      },
  
      isValidCart () {
        const utm = JSON.parse(window.sessionStorage.getItem('ecomUtm')) 
        this.seller = this.seller || this.utmSetter
        const sessionUtm = JSON.parse(window.sessionStorage.getItem('ecomUtm')) || {}
        sessionUtm.term = this.seller
        sessionUtm.content = this.seller
        window.sessionStorage.setItem('ecomUtm', JSON.stringify(sessionUtm))
        const hasSeller = ['bruna', 'sandy'].some(name => this.seller && this.seller.toLowerCase() === name)
        return this.quantityCart >= 3 && (hasSeller)
      },
  
      localDiscountCoupon: {
        get () {
          return this.discountCoupon
        },
        set (couponCode) {
          this.$emit('update:discount-coupon', couponCode)
        }
      },

      canBuy () {
        return this.quantityCart >= this.quantityToBuy
      },

      lessQuantity () {
        const less = this.quantityToBuy - this.quantityCart
        return less >= 0 ? less : 0 
      },

      percentBar () {
        const ratio = this.quantityCart / this.quantityToBuy
        return Math.round((ratio >= 1 ? 1 : ratio) * 100) + '%'
      }
    },
  
    methods: {
      formatMoney,

      getSelect (sell) {
        const { sessionStorage } = window
        const storageKey = 'ecomUtm'
        const utm = JSON.parse(sessionStorage.getItem(storageKey)) || {}
        const seller = sell && sell.title
        this.utmSetter = seller
        if (!seller.includes('Nenhum')) {
          this.seller = seller
          utm['content'] = seller
          utm['term'] = seller
          if (!utm['campaign']) {
            utm['campaign'] = 'vendedora'
          }
          if (!utm['source']) {
            utm['source'] = 'atendimento'
          }
        } else {
          delete utm['campaign']
          delete utm['source']
        }
        console.log(utm)
        sessionStorage.setItem(storageKey, JSON.stringify(utm))
      }, 
  
      selectShippingService (service) {
        this.$emit('select-shipping', service)
        this.$nextTick(() => {
          this.canApplyDiscount = true
        })
      },
  
      setDiscountRule (discountRule) {
        this.$emit('set-discount-rule', discountRule)
        this.$nextTick(() => {
          this.isCouponApplied = Boolean(this.discountCoupon && this.amount.discount)
        })
      }
    },
  
    watch: {
      localZipCode (zipCode) {
        this.$emit('update:zip-code', zipCode)
      },
  
      canApplyDiscount (canApplyDiscount) {
        if (!canApplyDiscount) {
          this.isCouponApplied = false
        }
      }
    },
  
    mounted () {
      this.$nextTick(() => {
        this.canApplyDiscount = !this.localZipCode
      })
      const { ecomCart } = this
      const getNumItems = () => ecomCart.data.items.reduce((numItems, { flags, quantity }) => {
        if (!flags || !flags.includes('freebie')) {
          numItems += quantity
        }
        return numItems
      }, 0)
      let oldNumItems = getNumItems()
      const cartWatcher = () => {
        this.canApplyDiscount = !this.localZipCode
        const numItems = getNumItems()
        if (oldNumItems !== numItems) {
          ecomCart.data.items.forEach(({ _id, quantity, flags }) => {
            if (Array.isArray(flags) && flags.includes('freebie') && quantity === 1) {
              ecomCart.removeItem(_id)
            }
          })
          oldNumItems = numItems
        }
      }
      ecomCart.on('change', cartWatcher)
      this.$once('hook:beforeDestroy', () => {
        ecomCart.off('change', cartWatcher)
      })
    }
  }
  