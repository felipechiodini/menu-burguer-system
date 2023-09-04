<template>
  <div>

    <label class="d-flex align-items-center pointer w-100 p-4 border-bottom" @click="setPayment(option)" :class="{ 'bg-primary shadow': teste === 'pix' }" for="pix" v-for="(option, key) in options" :key="key">
      <b-form-radio v-model="teste" name="payment-method" value="pix" id="pix"></b-form-radio>
      <span>{{ option.name }}</span>
    </label>

    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0" style="position: fixed; bottom: 0; z-index: 2;">
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
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      coupon: null,
      teste: null,
      options: [
        { name: 'Dinheiro' },
        { name: 'Pix' },
        { name: 'Cartão Crédito' },
        { name: 'Cartão Débito' },
      ]
    }
  },
  methods: {
    ...mapActions('cart', ['finish', 'setPayment']),
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