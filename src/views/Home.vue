<template>
  <div class="container">
    <div class="row">
      <img class="w-100" src="https://www.saboravida.com.br/wp-content/uploads/2021/09/hamburgueria-conheca-as-20-melhores-de-sp-1.jpg" alt="">
      <store-status :status="true"></store-status>
      <warning text="(47)99732-6769 ATENÇÃO: Bebidas alcoólicas somente para maiores de 18 anos, será conferido a identidade no momento da entrega."></warning>
      <categoriess></categoriess>
      <product v-for="(product, key) in products.data" :key="key" :product="product" />
    </div>
  </div>
</template>

<script>
import Api from '@/js/Api'
import StoreStatus from '@/components/StoreStatus.vue'
import Warning from '@/components/Warning.vue'
import Categoriess from '@/components/Categoriess.vue'
import Product from '@/components/Product.vue'

export default {
  name: 'Home',
  components: {
    StoreStatus,
    Warning,
    Categoriess,
    Product,
  },
  data: () => {
    return {
      data: null,
      products: [],
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
    openModal() {
      this.$FModal.show(
        Product,
        { msg: "Welcome to Your Vue.js App" }
      )
    }
  }
}
</script>
