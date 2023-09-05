<template>
  <div>

    <div class="d-flex justify-content-center align-items-center w-100 bg-primary py-1">
      <b-button @click="$emit('go-back')" variant="primary" class="col-auto">
        <span class="material-icons">arrow_back_ios</span>
      </b-button>
      <span class="col text-white">Carrinho</span>
    </div>

    <label :for="`${payment.id}`" class="d-flex align-items-center pointer w-100 p-4 border-bottom" v-for="(payment, key) in store.payments" :key="key">
      <b-form-radio :id="`${payment.id}`" size="lg" name="selected-payment" :value="payment.id" v-model="payment.id" class="col-auto" />
      <span>{{ payment.name }}</span>
    </label>

    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0" style="position: fixed; bottom: 0; z-index: 2;">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(cartTotalPrice) }}</td>
        </tr>
        <tr>
          <td>Entrega</td>
          <td align="right">{{ currency(5) }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ currency(85) }}</td>
        </tr>
      </table>
      <b-button class="border-none bg-primary btn-add" @click="finish()">
        <span class="text-white">Confirmar Pedido</span>
      </b-button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      payment: {
        id: null  
      }
    }
  },
  computed: {
    ...mapGetters('store', ['store']),
    ...mapGetters('cart', ['cartTotalPrice'])
  },
  methods: {
    ...mapActions('cart', ['setPayment']),
    setPaymentId(option) {
      this.payment.id = option.id
    },
    finish() {
      this.setPayment(this.payment)
      this.finish()
    }
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