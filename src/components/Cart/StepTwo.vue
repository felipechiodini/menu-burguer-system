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
      <div class="col-12">
        <label for="cep">CEP</label>
        <b-input type="tel" id="cep" v-mask="'#####-###'" v-model="cep" @input="searchCep" />
      </div>
      <div class="col-12">
        <label for="city">Cidade</label>
        <b-input id="city" v-model="city"></b-input>
      </div>
      <div class="col-12">
        <label for="state">Estado</label>
        <b-input id="state" v-model="state"/>
      </div>
      <div class="col-12">
        <label for="district">Bairro</label>
        <b-input id="district" v-model="district"></b-input>
      </div>
      <div class="col-12">
        <label for="street">Rua</label>
        <b-input id="street" v-model="street"></b-input>
      </div>
      <div class="col-12">
        <label for="number">Número</label>
        <b-input type="tel" ref="number" id="number" v-model="number"></b-input>
      </div>
      <div class="col-12">
        <label for="complement">Complemento</label>
        <b-input id="complement" v-model="complement"></b-input>
      </div>
      <div class="col-12">
        <label for="additionals">Informações adicionais</label>
        <b-input id="additionals" v-model="additionals"></b-input>
      </div>
    </div>

    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white" style="position: fixed; bottom: -1px; z-index: 2;">
      <b-button class="border-none bg-primary btn-add" @click="confirmOrder()">
        <span class="text-white">Pagamento</span>
      </b-button>
    </div>

  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'
import axios from 'axios'

export default {
  components: {
    FloatButton
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
    }
  },
  methods: {
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
    margin-top: 60px;
    margin-bottom: 100px;
    
    & label {
      margin: 15px 0 0 0;
    }
  }

</style>