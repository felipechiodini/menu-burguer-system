<template>
  <div class="container-fluid">

    <label class="d-flex align-items-center payment-method" @click="setPayment('pix')" :class="{ 'border shadow': teste === 'pix' }" for="pix">
      <b-form-radio v-model="teste" name="payment-method" value="pix" id="pix"></b-form-radio>
      <span>Pix</span>
    </label>

    <label class="d-flex align-items-center payment-method" @click="setPayment('credit-card')" :class="{ 'border shadow': teste === 'credit-card' }" for="credit-card">
      <b-form-radio v-model="teste" name="payment-method" value="credit-card" id="credit-card"></b-form-radio>
      <span>Cartão de Crédito</span>
    </label>

    <label class="d-flex align-items-center payment-method" @click="setPayment('debit-card')" :class="{ 'border shadow': teste === 'debit-card' }" for="debit-card">
      <b-form-radio v-model="teste" name="payment-method" value="debit-card" id="debit-card"></b-form-radio>
      <span>Cartão de Débito</span>
    </label>

    <label class="d-flex align-items-center payment-method" @click="setPayment('cash')" :class="{ 'border shadow': teste === 'cash' }" for="cash">
      <b-form-radio v-model="teste" name="payment-method" value="cash" id="cash"></b-form-radio>
      <span>Dinheiro</span>
    </label>


    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white" style="position: fixed; bottom: -1px; z-index: 2;">
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
      teste: null
    }
  },
  methods: {
    ...mapActions('cart', ['finish', 'setPayment']),
  }
}
</script>

<style lang="scss" scoped>

  .payment-method {
    width: 100%;
    border-radius: 5px;
    padding: 30px;
    margin: 10px 0;
  }

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