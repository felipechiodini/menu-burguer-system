<template>
  <div class="container my-3">
    <div class="row justify-content-center wraper">
      <div class="col-12">
        <label for="name">Nome</label>
        <b-input id="name" v-model="name"></b-input>
      </div>
      <div class="col-12">
        <label for="">Telefone de Contato</label>
        <b-input v-model="cellphone"></b-input>
      </div>
      <div class="col-12">
        <label for="cpf">CPF</label>
        <b-input type="tel" id="cpf" v-model="cpf"></b-input>
      </div>
      <!-- <div class="col-12">
        <b-form-group>
          <label class="w-100 border rounded p-2 my-2" v-for="(address, key) in user.addresses" :key="key">
            <b-form-radio v-model="selected" name="some-radios">{{ `${address.cep}, ${address.street} - ${address.number}` }}</b-form-radio>
          </label>
        </b-form-group>
      </div> -->
    </div>

    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white" style="position: fixed; bottom: -1px; z-index: 2;">
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
      <b-button class="border-none bg-primary btn-add" @click="confirmOrder()">
        <span class="text-white">Pagamento</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import Api from '@/js/Api'

export default {
  components: {
  },
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
      additionals: null,
      selected: null,
    }
  },
  computed: {
    ...mapGetters('cart', ['cartProducts', 'numberProducts', 'hasProducts', 'cartTotalPrice', 'cartShippingPrice']),
    ...mapGetters('user', ['user']),
  },
  methods: {
    ...mapActions('cart', ['setShipping']),
    confirmOrder() {
      this.$emit('next-step')
    },
    async searchCep(cep) {
      cep = cep.replace('-', '')
      if (cep.length === 8) {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (!data.erro) {
          this.state = data.uf
          this.city = data.localidade
          this.district = data.bairro
          this.street = data.logradouro

          Api.get('shipping', {
            params: {
              cep
            }
          }).then(({ data }) => {
            this.setShipping(data.value)
          })

          this.$refs.number.focus()
        }
      }
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
    outline: none;
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