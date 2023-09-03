import Api from "@/js/Api"

const state = {
  products: [],
  shippingPrice: null,
  checkoutStatus: null
}

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.products.map(product => {
      const rootProduct = rootState.products.all.find(item => item.id === product.id)

      const price = (rootProduct.price +
        + product.additionals.reduce((acumulator, additional) => acumulator += additional.price * additional.amount, 0)
        + product.replacements.reduce((acumulator, replacement) => acumulator += replacement.price, 0)) * product.count
      
      return {
        id: product.id,
        name: rootProduct.name,
        main_photo: rootProduct.main_photo,
        count: product.count,
        additionals: product.additionals,
        replacements: product.replacements,
        observation: product.observation,
        price: price
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => total += product.price, 0)
  },

  cartShippingPrice: (state) => {
    return state.shippingPrice
  },

  numberProducts: (state) => {
    return state.products.reduce((acumulator, product) => {
      return acumulator = acumulator + product.count
    }, 0)
  },

  hasProducts: (state, getters) => {
    return getters.numberProducts > 0
  },
  
}

// actions
const actions = {
  async finish({ commit, state }, products) {
    await Api.post('cart/finish', {
      products: state.products,
      customer: {
        name: 'Felipe Chiodini Bona',
        cpf: '11048424910',
        email: 'felipechiodinibona@hotmail.com'
      },
      delivery: {
        type: 1
      },
      payment: {
        id: 'pix'
      },
      address: {
        street: 'Arthur gonççalvez e arruajo',
        number: '500'
      }
    })
  },

  setPayment({ commit }, value) {
    commit('setPaymentr', value)
  },

  setShipping({ commit }, value) {
    commit('setShippingPrice', value)
  },

  addProductToCart({ state, commit }, payload) {
    const product = state.products.find(product => product.id === payload.id)

    if (!product) {
      commit('pushProductToCart', payload)
    } else {
      commit('incrementItemQuantity', payload)
    }
  },

  incrementProduct({ state, commit }, id) {
    commit('incrementItemCart', id)
  },
      
  decrementProduct({ state, commit }, id) {
    const product = state.products.find(product => product.id === id)

    if (product.count === 1) {
      commit('removeItemCart', id)
    } else {
      commit('decrementItemCart', id)
    }
  }

}

const mutations = {
  pushProductToCart(state, product) {
    state.products.push(product)
  },

  incrementItemQuantity(state, payload) {
    const cartItem = state.products.find(product => product.id === payload.id)
    cartItem.count = cartItem.count + payload.count
  },

  incrementItemCart(state, id) {
    const product = state.products.find(product => product.id === id)
    product.count = product.count + 1
  },

  decrementItemCart(state, id) {
    const product = state.products.find(product => product.id === id)
    product.count = product.count - 1
  },

  removeItemCart(state, id) {
    state.products = state.products.filter(product => product.id !== id)
  },

  setShippingPrice(state, shippingPrice) {
    state.shippingPrice = shippingPrice
  },

  setPaymentr(state, value) {
    state.payment = {
      payment_type_id: value
    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}