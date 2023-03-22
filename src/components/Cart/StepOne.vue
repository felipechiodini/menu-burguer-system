<template>
  <div class="container">
    <div style="margin-top: 75px;">
      <div class="row mx-1 p-3 my-3 item shadow" v-for="(product, key) in cartProducts" :key="key" >
        <img class="image" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg">
        <div class="col">
          <h5 class="mb-3 title">{{ product.name }}</h5>
          <div class="d-flex align-items-center">
            <b-button style="padding: 2px;" class="d-flex" variant="primary" size="sm" @click="decrementProduct(product.id)">
              <span v-if="product.count > 1" class="material-icons">remove</span>
              <span v-else class="material-icons">delete</span>
            </b-button>
            <strong class="mx-3">{{ product.count }}</strong>   
            <b-button style="padding: 2px;" class="d-flex" variant="primary" size="sm" @click="incrementProduct(product.id)">
              <span class="material-icons">add</span>
            </b-button>
          </div>
        </div>
        <div class="col-auto p-0 d-flex align-items-end">
          <span class="title">{{ currency(product.price) }}</span>
        </div>
      </div>
    </div>
    <div class="row align-items-center border-top justify-content-center w-100 py-3 shadow-lg bg-white" style="position: fixed; bottom: -1px; z-index: 2;">
      <b-button class="row justify-content-between border-none bg-primary btn-add" @click="goAddress()">
        <span class="col text-white">{{ numberProducts }}</span>
        <span class="col text-white">Continuar</span>
        <span class="col text-white">{{ currency(cartTotalPrice) }}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    FloatButton
  },
  computed: {
    ...mapGetters('cart', ['cartProducts', 'numberProducts', 'hasProducts', 'cartTotalPrice'])
  },
  methods: {
    ...mapActions('cart', ['decrementProduct', 'incrementProduct']),
    goAddress() {
      this.$emit('next-step')
    },
  }
}
</script>

<style lang="scss" scoped>

  .resume-table {
    width: 90%;
    font-size: 13px;
    margin-bottom: 7px;

    & td {
      padding: 6px 0;
    }

    & .total {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .image {
    border-radius: 5px;
    height: 100px;
    width: 100px;
    object-fit: cover;
  }

  .item {
    border-radius: 5px;
  }

  .title {
    font-size: 1.4rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

</style>