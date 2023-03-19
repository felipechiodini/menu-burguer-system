<template>
  <div class="container">
    
    <div style="margin-top: 75px;">
      <div class="row mx-1 mt-4 mb-3 align-items-center item shadow" v-for="(product, key) in cartProducts" :key="key" >
        <img class="image m-2" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg">
        <div class="col-auto">
          <div style="display: flex; flex-direction: column; justify-content: space-around;">
            <span class="">{{ product.name }}</span>
            <span class="">{{ currency(product.price) }}</span>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <b-button class="d-flex" variant="primary" size="sm" @click="decrementProduct(product.id)">
            <span v-if="product.count > 1" class="material-icons">remove</span>
            <span v-else class="material-icons">delete</span>
          </b-button>
          <strong class="mx-3">{{ product.count }}</strong>   
          <b-button class="d-flex" variant="primary" size="sm" @click="incrementProduct(product.id)">
            <span class="material-icons">add</span>
          </b-button>
        </div>

      </div>
    </div>
    
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg" style="position: fixed; bottom: -1px; z-index: 2;">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(80) }}</td>
        </tr>
        <tr>
          <td>Entrega</td>
          <td align="right">{{ currency(5) }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ currency(cartTotalPrice) }}</td>
        </tr>
      </table>
      <b-button class="border-none bg-primary btn-add" @click="goAddress()">
        <span class="text-white">Continuar</span>
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

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

</style>