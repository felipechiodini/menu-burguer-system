<template>
  <div>
    <div>
      <div class="row align-items-center border-bottom w-100 p-4 pointer m-0" v-for="(option, key) in options" :key="key" :class="{ 'bg-primary': selectedOption === option.id }" @click="selectOption(option)">
        <span class="material-icons mr-2">{{ option.icon }}</span>
        <span>{{ option.name }}</span>
        <span class="ml-auto col-auto d-flex align-items-center">
          <span class="material-icons mr-1">access_time</span>
          <span>{{ option.time }}</span>
        </span>
        <b-form-radio v-model="selectedOption" class="col-auto" />
      </div>
      <template v-if="selectedOption !== null">
        <div class="row border-bottom align-items-center w-100 p-3 rounded m-0 pointer" v-if="isDelivery">
          <div class="col-auto">
            <span class="material-icons">gps_fixed</span>
          </div>
          <div class="col d-flex flex-column">
            <small class="text-muted mb-1" style="font-size: 13px;">Entregar em</small>
            <strong class="mb-1">Guilherme Koehler, 174</strong>
            <small class="text-muted mb-1" style="font-size: 13px;">Vieiras</small>
          </div>
          <div class="col-auto">
            <span class="material-icons">arrow_forward_ios</span>
          </div>
        </div>
        <div class="row justify-content-center p-3">
          <div class="col-12 mb-3">
            <b-input placeholder="Nome" class="px-1" id="name" v-model="name" />
          </div>
          <div class="col-12 mb-3">
            <b-input placeholder="Celular" class="px-1" v-model="cellphone" />
          </div>
          <div class="col-12 mb-3">
            <b-input placeholder="CPF" class="px-1" type="tel" id="cpf" v-model="cpf" />
          </div>
          <div class="col-12 mb-3">
            <b-input placeholder="E-mail" class="px-1" type="email" id="email" v-model="email" />
          </div>
        </div>
      </template>
    </div>
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white" style="position: sticky; bottom: 0; left: 0; z-index: 2;">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(cartTotalPrice) }}</td>
        </tr>
        <tr>
          <td>Entrega</td>
          <td align="right">{{ currency(cartShippingPrice) || 'Aguardando endereço' }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ currency(cartTotalPrice) }}</td>
        </tr>
      </table>
      <b-button class="border-none bg-primary btn-add d-flex align-items-center justify-content-center" @click="confirmOrder()">
        <span class="text-white mr-3">Pagamento</span>
        <span class="material-icons text-white">arrow_forward_ios</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      name: null,
      cpf: null,
      cep: null,
      state: null,
      city: null,
      district: null,
      street: null,
      number: null,
      complement: null,
      cellphone: null,
      email: null,
      additionals: null,
      selected: null,
      selectedOption: null,
      options: [
        { id: 1, name: 'Entrega', icon: 'delivery_dining', time: '1h' },
        { id: 2, name: 'Retirada', icon: 'storefront', time: '30min' }
      ]
    }
  },
  computed: {
    ...mapGetters('cart', ['cartProducts', 'numberProducts', 'hasProducts', 'cartTotalPrice', 'cartShippingPrice']),
    ...mapGetters('user', ['user']),
    isDelivery() {
      return this.selectedOption === 1
    }
  },
  methods: {
    ...mapActions('cart', ['setShipping']),
    confirmOrder() {
      this.$emit('next-step')
    },
    selectOption(option) {
      this.selectedOption = option.id
    }
  }
}
</script>

<style lang="scss" scoped>

  input {
    border-radius: 0;
    border: none;  
    border-bottom: 1px solid #ccc;
    margin: 0;

    &:focus {
      outline: none;
    }
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

  .wraper {
    margin-top: 80px;
    margin-bottom: 100px;
    
    & label {
      margin: 15px 0 0 0;
    }
  }

</style>