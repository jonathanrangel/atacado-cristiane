import {
    i19select,
    i19selectVariation
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    specValueByText as getSpecValueByText,
    specTextValue as getSpecTextValue,
    variationsGrids as getVariationsGrids,
    gridTitle as getGridTitle
  } from '@ecomplus/utils'

  import QuantitySelector from '@ecomplus/storefront-components/src/QuantitySelector.vue'
  
  export default {
    name: 'ProductVariations',

    components: {
        QuantitySelector
      },
  
    props: {
      product: {
        type: Object,
        required: true
      },
      selectedId: String,
      maxOptionsBtns: {
        type: Number,
        default: 6
      },
      gridsData: {
        type: Array,
        default () {
          if (typeof window === 'object' && window.storefront && window.storefront.data) {
            return window.storefront.data.grids
          }
        }
      }
    },
  
    data () {
      return {
        selectedOptions: {},
        filteredGrids: {},
        together: [],
        buyTogether: []
      }
    },
  
    computed: {
      i19select: () => i18n(i19select),
      i19selectVariation: () => i18n(i19selectVariation),
  
      variationsGrids () {
        return getVariationsGrids(this.product)
      },

      productWithMetafied () {
        const modifiedProduct = Object.assign({}, this.product)
        const { metafields } = this.product
        if (modifiedProduct.variations && modifiedProduct.variations.length && metafields && metafields.length) {
          modifiedProduct.variations.map((variation, i) => {
            const metafield = metafields.find(({ namespace, _id }) => (namespace || _id) === variation._id)
            if (metafield && metafield.value) {
              console.log(console.log(metafield.value))
              variation.quantity = Number(metafield.value) > variation.quantity ? variation.quantity : Number(metafield.value)
            }
            return variation    
          })
        }
        return modifiedProduct
      },
  
      orderedGrids () {
        return Object.keys(this.variationsGrids)
      },
  
      variationFromUrl () {
        if (typeof window === 'object') {
          const urlParams = new URLSearchParams(window.location.search)
          const variationId = urlParams.get('variation_id')
          if (variationId) {
            return variationId
          }
        }
        return null
      }
    },
  
    methods: {
      getColorOptionBg (optionText) {
        const rgbs = optionText.split(',').map(colorName => {
          return getSpecValueByText(this.product.variations, colorName.trim(), 'colors')
        })
        return rgbs.length > 1
          ? `background:linear-gradient(to right bottom, ${rgbs[0]} 50%, ${rgbs[1]} 50%)`
          : `background:${rgbs[0]}`
      },
  
      getSpecValue (optionText, grid) {
        const { variations } = this.product
        let values
        if (grid === 'colors') {
          const colorNames = optionText.split(',')
          if (colorNames.length > 1) {
            values = []
            colorNames.forEach(color => {
              values.push(getSpecValueByText(variations, color.trim(), grid))
            })
          }
        }
        return values || getSpecValueByText(variations, optionText, grid)
      },
  
      getGridTitle (grid) {
        return getGridTitle(grid, this.gridsData)
      },

      getItems (value) {
        this.together = value
      },
  
      selectOption (optionText, grid, gridIndex) {
        const { product, selectedOptions, orderedGrids } = this
        this.$set(selectedOptions, grid, optionText)
        this.$emit('select-option', {
          gridId: grid,
          gridIndex,
          optionText
        })
        const filterGrids = {}
        for (let i = 0; i <= gridIndex; i++) {
          const grid = orderedGrids[i]
          if (selectedOptions[grid]) {
            filterGrids[grid] = selectedOptions[grid]
          }
        }
        const nextFilteredGrids = getVariationsGrids(product, filterGrids, true)
        for (let i = gridIndex + 1; i < orderedGrids.length; i++) {
          const grid = orderedGrids[i]
          const options = nextFilteredGrids[grid]
          this.filteredGrids[grid] = options
          if (selectedOptions[grid] && !options.includes(selectedOptions[grid])) {
            this.$set(selectedOptions, grid, undefined)
          }
        }
        const variations = product.variations.slice(0)
        for (let i = 0; i < variations.length; i++) {
          const variation = variations[i]
          const { specifications } = variation
          for (const grid in specifications) {
            if (selectedOptions[grid] !== getSpecTextValue(variation, grid)) {
              variations.splice(i, 1)
              i--
              break
            }
          }
        }
        this.$emit('update:selected-id', variations.length ? variations[0]._id : null)
      }
    },
  
    watch: {
      'product.variations': {
        handler () {
          this.filteredGrids = getVariationsGrids(this.product, null, true)
        },
        deep: true,
        immediate: true
      },

      together: {
        handler (current, old) {
          const keyCurrent = Object.keys(current)
          if (keyCurrent && keyCurrent.length && keyCurrent[0].length > 5) {
            const hasItem = this.buyTogether.findIndex(item => {
              const itemId = Object.keys(item)
              return itemId[0] === keyCurrent[0]
            })
            if (!this.buyTogether.length || !(hasItem >= 0)) {
              const clone = Object.assign({}, current);
              this.buyTogether.push(clone)
            } else if (hasItem >= 0) {
              this.buyTogether[hasItem][keyCurrent[0]] = current[keyCurrent]  
            }
          }
          this.$emit('atacado', this.buyTogether)
        },
        deep: true,
        immediate: true
      }
    },
  
    mounted () {
      if (this.variationFromUrl && Array.isArray(this.product.variations)) {
        const selectedVariation = this.product.variations.find(variation => variation._id === this.variationFromUrl)
        if (selectedVariation) {
          const { specifications } = selectedVariation
          const specs = Object.keys(specifications)
          const nextSpec = (specIndex = 0) => {
            const spec = specs[specIndex]
            if (specs[specIndex] && specifications[spec] && specifications[spec].length === 1) {
              const specText = specifications[spec][0].text
              if (this.variationsGrids[spec].find(option => option === specText)) {
                this.$nextTick(() => {
                  this.selectOption(specText, spec, this.orderedGrids.indexOf(spec))
                  nextSpec(specIndex + 1)
                })
              }
            }
          }
          nextSpec()
        }
      }
    }
  }
  