import '#template/js/checkout'
import './custom-js/checkout'
import ecomCart from '@ecomplus/shopping-cart'
var lessUnit = document.getElementById('lessUnit')
var firstphrase = document.getElementById('lessSome')
var lastphrase = document.getElementById('noMore')
var lessQuantity = 8
window.lessQuantity = lessQuantity
lessUnit.innerHTML = lessQuantity
ecomCart.on('change', ({ data }) => {
  if (data && data.items && data.items.length === 0) {
    window.sessionStorage.setItem('buyTimer', JSON.stringify({ date: new Date(), cart: 0 }))
    window.location = '/'
  }
  var cartCalc = document.querySelectorAll('#cart')
  if (cartCalc.length) {
    document.getElementById('containerCalc').style.display = 'block'
    var checkoutButton = document.querySelector('.cart__btn-checkout')
    var percentBar
    var countQuantity = data.items.reduce((acc, curr) => acc + curr.quantity, 0)
    var evalQuantity = lessQuantity - countQuantity
    if (evalQuantity > 0) {
      lessUnit.innerHTML = evalQuantity
      percentBar = Math.round(countQuantity / lessQuantity * 100) + '%'
      document.getElementById('lastUnitsBar').style.width = percentBar
      document.getElementById('percentBar').innerHTML = percentBar
      firstphrase.style.display = 'block'
      lastphrase.style.display = 'none'
      checkoutButton.style.display = 'none'
    } else {
      percentBar = '100%'
      checkoutButton.style.display = 'block'
      firstphrase.style.display = 'none'
      lastphrase.style.display = 'block'
      document.getElementById('lastUnitsBar').style.width = percentBar
      document.getElementById('percentBar').innerHTML = percentBar
    }
  } else {
    document.getElementById('containerCalc').style.display = 'none'
  }
})
const router1 = window.storefrontApp && window.storefrontApp.router
setInterval(function () {
  if (router1) {
    const emitCheckout1 = (name) => {
      var countQuantity = ecomCart.data.items.reduce((acc, curr) => acc + curr.quantity, 0)
      window.countQuantity = countQuantity
      if (countQuantity < lessQuantity) {
       window.location.href = '/app/#/cart'
       window.alert('Apenas ' + countQuantity + ' itens no carrinho. Um deles acabou estoque! Você estará sendo direcionado para o carrinho para inserir mais um item')
      }
    }

    const addRoute1ToData = ({ name }) => {
      if (name === 'checkout') {
        emitCheckout1(name)
      }
      if (name === 'confirmation') {
        if (window.sessionStorage.getItem('buyTimer')) {
          const jsonTimerCheckout = JSON.parse(window.sessionStorage.getItem('buyTimer'))
          if (!jsonTimerCheckout.reload) {
            window.location.reload()
          } 
        }
        window.sessionStorage.setItem('buyTimer', JSON.stringify({ date: new Date(), cart: 0, reload: 1 }))
        document.getElementById('containerCalc').style.display = 'none'
      }
    }

    if (router1.currentRoute) {
      addRoute1ToData(router1.currentRoute)
    }
    router1.afterEach(addRoute1ToData)
  }
}, 300)


window.timerFunction = (endDate, newEnd, $div) => {
  console.log($div, endDate)
  let countToDate
  const endTime = window.ecomCart && window.ecomCart.data && window.ecomCart.data.created_at || endDate
  const timeEnd = new Date(endTime).getTime()
  const tomorrow = new Date(newEnd).getTime()
  const diffTime =  tomorrow - timeEnd
  if (diffTime > 0) {
    countToDate = tomorrow
  } else {
    countToDate = timeEnd
  }
  let previousTimeBetweenDates
  setInterval(() => {
    const currentDate = new Date()
    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
    const correctTimer = timeBetweenDates > 0 ? timeBetweenDates : 0
    flipAllCards(correctTimer, $div)
    previousTimeBetweenDates = correctTimer
    if (correctTimer === 0) {
      document.getElementById($div).style.display = 'none'
    }
  }, 250)
  const flipAllCards = (time, $div) => {
    const seconds = time % 60
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
  
    flip(document.querySelector(`${$div} [data-hours-tens]`), Math.floor(hours / 10))
    flip(document.querySelector(`${$div} [data-hours-ones]`), hours % 10)
    flip(document.querySelector(`${$div} [data-minutes-tens]`), Math.floor(minutes / 10))
    flip(document.querySelector(`${$div} [data-minutes-ones]`), minutes % 10)
    flip(document.querySelector(`${$div} [data-seconds-tens]`), Math.floor(seconds / 10))
    flip(document.querySelector(`${$div} [data-seconds-ones]`), seconds % 10)
  }
  const flip = (flipCard, newNumber) => {
    const topHalf = flipCard.querySelector(".top")
    const startNumber = parseInt(topHalf.textContent)
    if (newNumber === startNumber) return
    const bottomHalf = flipCard.querySelector(".bottom")
    const topFlip = document.createElement("div")
    topFlip.classList.add("top-flip")
    const bottomFlip = document.createElement("div")
    bottomFlip.classList.add("bottom-flip")
  
    top.textContent = startNumber
    bottomHalf.textContent = startNumber
    topFlip.textContent = startNumber
    bottomFlip.textContent = newNumber
  
    topFlip.addEventListener("animationstart", e => {
      topHalf.textContent = newNumber
    })
    topFlip.addEventListener("animationend", e => {
      topFlip.remove()
    })
    bottomFlip.addEventListener("animationend", e => {
      bottomHalf.textContent = newNumber
      bottomFlip.remove()
    })
    flipCard.append(topFlip, bottomFlip)
  }
}

if (window.sessionStorage.getItem('buyTimer')) {
  const jsonTimer = window.sessionStorage.getItem('buyTimer')
  const json = JSON.parse(jsonTimer)
  if (json.cart === 0 && window.ecomCart && window.ecomCart.data && window.ecomCart.data.items && window.ecomCart.data.items.length) {
    window.sessionStorage.setItem('buyTimer', JSON.stringify({ date: new Date(), dateCart: new Date(), dateEndCart: new Date(new Date().getTime() + 900000),cart: window.ecomCart && window.ecomCart.data && window.ecomCart.data.items && window.ecomCart.data.items.length }))
  }
}
if (window.localStorage.getItem('ecomUtm') && !window.sessionStorage.setItem('ecomUtm')) {
  window.sessionStorage.setItem('ecomUtm', window.localStorage.getItem('ecomUtm'))
}