<template>
  <div class="container">

    <label for="">Nome</label>
    <b-input></b-input>

    <label for="">CEP</label>
    <b-input></b-input>

    <label for="">Estado</label>
    <b-input></b-input>

    <label for="">Cidade</label>
    <b-input></b-input>

    <label for="">Bairro</label>
    <b-input></b-input>

    <label for="">Rua</label>
    <b-input></b-input>

    <label for="">Número</label>
    <b-input></b-input>

    <label for="">Complemento</label>
    <b-input></b-input>

    <label for="">Telefone de Contato</label>
    <b-input></b-input>

    <label for="">Informações adicionais</label>
    <b-input></b-input>

    <float-button @click.native="goPayment()" size="large" position="bottom-right" />

  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'

export default {
  components: {
    FloatButton
  },
  methods: {
    goPayment() {
      this.$emit('next-step')
    }
  }

}
</script>

<style>

</style>