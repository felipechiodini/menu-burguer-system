import Api from "@/js/Api"

const state = {
  products: [],
  shippingPrice: null,
  customer: null,
  shipping: null,
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

const actions = {
  setShipping({ commit }, payload) {
    commit('setShipping', payload)
  },

  setPayment({ commit }, payload) {
    commit('setPayment', payload)
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
  },

  async finish() {
    await Api.post('cart/finish', {
      products: state.products,
      customer: this.customer,
      delivery: this.delivery,
      payment: this.payment,
      address: this.address
    })
  },

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

  setShipping(state, payload) {
    state.customer = payload.customer
    state.shipping = payload.shipping
  },

  setPayment(state, payload) {
    state.payment = payload
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}