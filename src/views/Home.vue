<template>
  <div class="container">
    <div class="row">
      <h4 class="col-12 my-3 title">Plankton Smash Burguer</h4>
      <store-status class="col-12" :status="true"></store-status>
      <warning text="(47)99732-6769 ATENÇÃO: Bebidas alcoólicas somente para maiores de 18 anos, será conferido a identidade no momento da entrega."></warning>
      <product v-for="(product, key) in products" :key="key" :product="product" />
    </div>
    <div class="row align-items-center border-top justify-content-center w-100 py-3 shadow-lg bg-white" style="position: fixed; bottom: -1px; z-index: 2;">
      <b-button class="row justify-content-between border-none bg-primary btn-add" @click="goCart()">
        <span class="col text-white">2</span>
        <span class="col text-white">Ver Carrinho</span>
        <span class="col text-white">{{ currency(23) }}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import Api from '@/js/Api'
import StoreStatus from '@/components/StoreStatus.vue'
import Warning from '@/components/Warning.vue'
import Product from '@/components/Product.vue'

export default {
  name: 'Home',
  components: {
    StoreStatus,
    Warning,
    Product,
  },
  data: () => {
    return {
      products: null,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const { data } = await Api.get('product')
      this.products = data
    },
    goCart() {
      this.$router.push({ name: 'cart' })
    },
  }
}
</script>

<style scoped>

  .title {
    font-size: 1.3rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }


</style>