<template>
  <div>
    <cart-header @go-back="$emit('go-back')" icon="arrow_forward_ios" name="" :down="true" />
    <h3 class="display-3">Pedido realizado com sucesso!</h3>
  </div>
</template>

<script>
import CartHeader from './Header.vue'

export default {
  components: {
    CartHeader
  }

}
</script>

<style>

</style>