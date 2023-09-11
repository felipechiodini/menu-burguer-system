import Api from "@/js/Api"

const state = {
  products: [],
  shippingPrice: null,
  customer: {
    name: null
  },
  shipping: null,
  delivery: {
    type: null
  },
  payment: {
    id: null
  },
  address: {
    street: null,
    number: null,
  }
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
        photo: rootProduct.photo,
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

  delivery: (state) => {
    return state.delivery
  },

  address: (state) => {
    return state.address
  },

  customer: (state) => {
    return state.customer
  },

  selectedPayment: (state) => {
    return state.payment
  }
  
}

const actions = {
  clearCart({ commit }) {
    commit('clearCart')
  },

  setCustomer({ commit }, payload) {
    commit('setCustomer', payload)
  },

  setDelivery({ commit }, payload) {
    commit('setDelivery', payload)
  },

  setAddress({ commit }, payload) {
    commit('setAddress', payload)
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

  finishCart({ state }) {
    return Api.post('cart/finish', {
      products: state.products,
      customer: state.customer,
      delivery: state.delivery,
      payment: state.payment,
      address: state.address
    })
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

  setDelivery(state, payload) {
    state.delivery.type = payload
  },

  setPayment(state, payload) {
    state.payment = {
      id: payload
    }

    console.log('here')
    console.log(state.payment)
  },

  setAddress(state, payload) {
    state.address = payload
  },
  
  setCustomer(state, payload) {
    state.customer = payload
  },

  clearCart(state) {
    state.products = [],
    state.customer = {
      name: null
    },
    state.shipping = null,
    state.delivery = {
      type: null
    },
    state.payment = {
      id: null
    },
    state.address = {
      street: null,
      number: null,
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