<template>
  <div>
    <carousel :per-page="1" paginationPosition="bottom-overlay" :mouse-drag="false">
      <slide v-for="(banner, key) in store.banners" :key="key">
        <img class="w-100" :src="banner.src">
      </slide>
    </carousel>
    <div class="container px-3 mt-3" style="margin-bottom: 100px;" v-if="store">
      <div class="mb-4">
        <h3 class="title mb-3">{{ store.name }}</h3>
        <store-status :status="store.status"></store-status>
        <h5 v-if="store.configuration.allow_withdrawal">{{ 'Retirada: ' + store.configuration.withdrawal_time + ' minutos' }}</h5>
        <h5>{{ 'Entrega: ' + store.configuration.delivery_time + ' minutos' }}</h5>
        <h5>{{ 'Pedido minimo: ' + currency(store.configuration.minimum_order_value) }}</h5>
        <warning :text="store.configuration.warning" />
      </div>
      <div class="d-flex categories">
        <span class="category active">Burguer</span>
        <span class="category">Porções</span>
        <span class="category">Bebidas</span>
        <span class="category">Chops</span>
      </div>
      <product @click.native="showProduct(product)" class="my-4 mx-2" v-for="(product, key) in products" :key="key" :product="product" />
      <div class="row align-items-center border-top justify-content-center w-100 py-3 shadow-lg bg-white"
        style="position: fixed; bottom: -1px; z-index: 2;">
        <b-button class="row justify-content-between border-none bg-primary btn-add" @click="goCart()">
          <span class="col text-white">2</span>
          <span class="col text-white">Ver Carrinho</span>
          <span class="col text-white">{{ currency(23) }}</span>
        </b-button>
      </div>
    </div>

    <product-preview :product="selectProduct" ref="modal"></product-preview>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Api from '@/js/Api'
import StoreStatus from '@/components/StoreStatus.vue'
import Warning from '@/components/Warning.vue'
import Product from '@/components/Product.vue'
import Storage from '@/js/Storage'
import ProductPreview from '@/components/ProductPreview.vue'

export default {
  name: 'Home',
  components: {
    StoreStatus,
    Warning,
    Product,
    NavBar,
    ProductPreview
  },
  data: () => {
    return {
      store: null,
      products: null,
      selectProduct: null
    }
  },
  async mounted() {
    this.load()
  },
  methods: {
    async load() {
      this.store = Storage.get('store')
      const { data } = await Api.get('product')
      this.products = data
    },
    showProduct(product) {
      this.$refs['modal'].openModal(product.id)
    }
  }
}
</script>

<style lang="scss" scoped>

  .title {
    font-size: 1.5rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

  .categories {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    padding: 13px;
    margin: 0 -16px;
  }

  .category {
    margin-right: 7px;
    padding: 6px;

    &.active {
      border-bottom: 0.5px solid red;
    }
  }

</style>