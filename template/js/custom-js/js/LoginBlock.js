import {
    i19continue,
    i19enterYourDocNumberMsg,
    i19enterYourEmailMsg,
    i19helloAgain,
    i19identifyYourAccount,
    i19invalidLoginInfoMsg,
    i19loginErrorMsg,
    i19manageYourPurchaseHistory,
    i19notifyAboutOrders,
    i19oauthOnPopup,
    i19orProceedWith,
    i19signInWith,
    i19weUseYourDataToMsg
  } from '@ecomplus/i18n'
  
  import { i18n } from '@ecomplus/utils'
  import ecomPassport from '@ecomplus/passport-client'
  import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
  import InputDocNumber from '@ecomplus/storefront-components/src/InputDocNumber.vue'

  const updateSpec = async (id) => {
    callApi(`products/${id}.json`, 'GET', (err, json) => {
      console.log(json)
      const specs = {
        "specifications": {
          "colors": [
            {
              "text": "Off White"
            }
          ],
          "age_group": [
            {
              "text": "Adulto",
              "value": "adult"
            }
          ],
          "gender": [
            {
              "text": "Masculino",
              "value": "male"
            }
          ]
        }
      }
    })
  }
 /*  let index = 0
  const getAllProducts = () => {
    const ids = Tabs[window.tabId].selectedItems
    if (index === ids.length) {
      console.log('done')
    } else {
      callApi(`products/${ids[index]}.json`, 'GET', (err, json) => {
        if (!err) {
          const specifications = json.specifications || {}
          const name = json.name || ''
          if (specifications) {
            ['gender', 'colors', 'age_group'].forEach(key => {
              let text, value
                if (key === 'gender') {
                  value = name.includes('Feminina') ? 'female' : 'male'
                  text = value === 'famale' ? 'Feminino' : 'Masculino'
                  specifications[key] = [{
                    text,
                    value
                  }]
                } else if (key === 'colors') {
                  const arrayName = name.split('-')
                  const colorI = arrayName[arrayName.length - 1].trim()
                  let color = colorI
                  if (color === 'vermelhita') {
                    color = 'Vermelho'
                  }
                  if (arrayName.length > 1) {
                    specifications[key] = [{
                      text: color
                    }]
                  } 
                } else {
                  const isKid = name.includes('kid')
                  specifications[key] = [{
                    text: isKid ? 'Kids' : 'Adult',
                    value: isKid ? 'kids' : 'adult'
                  }]
                }
            })
          }
          console.log(specifications, name)
          if (Object.keys(specifications).length) {
            callApi(`products/${ids[index]}.json`, 'PATCH', (error, result) => {
              if (!error) {
                index++
                getAllProducts()
              }
            }, { specifications })
          } else {
            index++
            getAllProducts()
          }
        }
      })
    }
  }
  getAllProducts() */
  
  export default {
    name: 'LoginBlock',
  
    components: {
      AAlert,
      InputDocNumber
    },
  
    props: {
      customerEmail: String,
      canAcceptGuest: {
        type: Boolean,
        default: false
      },
      ecomPassport: {
        type: Object,
        default () {
          return ecomPassport
        }
      }
    },
  
    data () {
      return {
        email: this.customerEmail,
        docNumber: '',
        isCompany: false,
        oauthProviders: [],
        isWaitingPopup: false,
        isWaitingLogin: false,
        failAlertText: null
      }
    },
  
    computed: {
      i19continue: () => i18n(i19continue),
      i19enterYourDocNumberMsg: () => i18n(i19enterYourDocNumberMsg),
      i19enterYourEmailMsg: () => i18n(i19enterYourEmailMsg),
      i19helloAgain: () => i18n(i19helloAgain),
      i19identifyYourAccount: () => i18n(i19identifyYourAccount),
      i19manageYourPurchaseHistory: () => i18n(i19manageYourPurchaseHistory),
      i19notifyAboutOrders: () => i18n(i19notifyAboutOrders),
      i19oauthOnPopup: () => i18n(i19oauthOnPopup),
      i19orProceedWith: () => i18n(i19orProceedWith),
      i19signInWith: () => i18n(i19signInWith),
      i19weUseYourDataToMsg: () => i18n(i19weUseYourDataToMsg)
    },
  
    methods: {
      confirmAccount () {
        const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
        const isIdentified = checkLogin() && !checkAuthorization() &&
          getCustomer().main_email === this.email
        if (isIdentified) {
          this.$nextTick(() => {
            this.$refs.InputDoc.$el.focus()
          })
        }
        return isIdentified
      },
  
      submitLogin () {
        if (!this.isWaitingLogin) {
          this.isWaitingLogin = true
          this.failAlertText = null
          const { docNumber } = this
          const email = this.email && this.email.toLowerCase()
          const isAccountConfirm = this.confirmAccount()
          const emitUpdate = () => this.$emit('update', { email, docNumber })
          this.ecomPassport.fetchLogin(email, isAccountConfirm ? docNumber : null)
            .then(() => {
              if (isAccountConfirm) {
                emitUpdate()
              }
            })
            .catch(err => {
              const { response } = err
              if (!response || response.status !== 403) {
                console.error(err)
                this.failAlertText = i18n(i19loginErrorMsg)
                if (response.status === 401) {
                  this.failAlertText = 'Seu cadastro ainda está em análise.'
                }
                
              } else if (!isAccountConfirm && this.canAcceptGuest) {
                this.$emit('update:customer-email', email)
                emitUpdate()
              } else {
                this.failAlertText = i18n(i19invalidLoginInfoMsg)
              }
            })
            .finally(() => {
              this.isWaitingLogin = false
            })
        }
      },
  
      oauthPopup (link) {
        this.ecomPassport.popupOauthLink(link)
        this.isWaitingPopup = true
        setTimeout(() => {
          this.isWaitingPopup = false
        }, 7500)
      }
    },
  
    watch: {
      email () {
        this.failAlertText = null
      },
  
      docNumber () {
        this.failAlertText = null
      }
    },
  
    created () {
      this.ecomPassport.fetchOauthProviders()
        .then(({ host, baseUri, oauthPath, providers }) => {
          const oauthProviders = []
          for (const provider in providers) {
            if (providers[provider]) {
              const { faIcon, providerName } = providers[provider]
              let link = host + baseUri + provider + oauthPath
              const referral = typeof window === 'object' &&
                window.sessionStorage.getItem('ecomReferral')
              if (referral) {
                link += `?referral=${referral}`
              }
              oauthProviders.push({
                link,
                faIcon,
                provider,
                providerName
              })
            }
          }
          this.oauthProviders = oauthProviders
        })
        .catch(err => {
          console.error(err)
        })
    },
  
    mounted () {
      this.$refs.inputEmail.focus()
      const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
      const handleLogin = () => {
        if (checkAuthorization()) {
          this.$emit('login', this.ecomPassport)
        } else if (checkLogin()) {
          const customer = getCustomer()
          this.email = customer.main_email
          this.isCompany = customer.registry_type === 'j'
          /* if (customer.referral) {
            window.sessionStorage.setItem('ecomReferral', customer.referral)
          } */
        }
      }
      ecomPassport.on('login', () => {
        this.isWaitingPopup = false
        //window.location.href = '/'
        handleLogin()
      })
      handleLogin()
    }
  }
  