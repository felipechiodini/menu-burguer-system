<template>
  <div class="container my-3">

    <label for="">Nome</label>
    <b-input v-model="name"></b-input>
    
    <label for="">Telefone de Contato</label>
    <b-input v-model="cellphone"></b-input>

    <label for="">CPF</label>
    <b-input v-model="cpf"></b-input>

    <label for="">CEP</label>
    <b-input v-model="cep" @input="searchCep"></b-input>

    <label for="">Estado</label>
    <b-input v-model="state"></b-input>

    <label for="">Cidade</label>
    <b-input v-model="city"></b-input>

    <label for="">Bairro</label>
    <b-input v-model="district"></b-input>

    <label for="">Rua</label>
    <b-input v-model="street"></b-input>

    <label for="">Número</label>
    <b-input v-model="number"></b-input>

    <label for="">Complemento</label>
    <b-input v-model="complement"></b-input>

    <label for="">Informações adicionais</label>
    <b-input v-model="additionals"></b-input>

    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg" style="position: fixed; bottom: -1px; z-index: 2;">
      <b-button class="border-none bg-primary btn-add" @click="confirmOrder()">
        <span class="text-white">Continuar</span>
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
      if (cep.length === 8) {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (!data.erro) {
          this.state = data.uf
          this.city = data.localidade
          this.district = data.bairro
          this.street = data.logradouro
        }
      }
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