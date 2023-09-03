import Api from "@/js/Api"

const state = {
  products: [],
  shippingPrice: null,
  checkoutStatus: null
}

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.products.map(product => {
      const rootProduct = rootState.products.all.find(product => product.id === product.id)

      const price = (rootProduct.price * product.count)
        + product.additionals.reduce((acumulator, additional) => acumulator += additional.price * additional.amount, 0)
        + product.replacements.reduce((acumulator, replacement) => acumulator += replacement.price, 0)
      
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
  async checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    await Api.post('order', state.products)
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

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}