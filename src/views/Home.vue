<template>
  <div v-if="store">
    <carousel
      :per-page="1"
      paginationPosition="bottom-overlay"
      :mouse-drag="false"
      :autoplay="true"
      :autoplayTimeout="4000"
      :loop="true"
    >
      <slide v-for="(banner, key) in store.banners" :key="key">
        <img class="w-100" :src="banner.src">
      </slide>
    </carousel>
    <div class="m-2">
      <div class="mb-4">
        <h3 class="title mb-3">{{ store.name }}</h3>
        <store-status :status="store.open"></store-status>
        <h5 class="my-1" v-for="(option, key) in store.delivery_options" :key="key">{{ option.name }}: {{ option.time }}</h5>
        <h5 class="my-1">{{ 'Pedido minimo: ' + currency(store.configuration.minimum_order_value) }}</h5>
        <h5>{{ labelDistance }}</h5>
        <warning v-if="store.configuration.warning" :text="store.configuration.warning" />
      </div>
      <div class="categories">
        <div class="category" v-for="(category, key) in categories" :key="key">
          <b-button @click="scrollToCategory(category)" variant="transparent p-0">{{ category.name }}</b-button>
        </div>
      </div>
      <product
        @click.native="showProduct(product)"
        v-for="(product, key) in allProducts"
        :key="key"
        :product="product"
        :category="product.category_name"
      />
    </div>
    <div class="row align-items-center border-top justify-content-center w-100 py-3 shadow-lg bg-white m-0" style="position: sticky; bottom: 0; right: 0; z-index: 2;" v-if="hasProducts">
      <b-button class="row justify-content-between border-none bg-primary btn-add" @click="goCart()">
        <span class="col text-white">{{ numberProducts }}</span>
        <span class="col text-white">Ver Carrinho</span>
        <span class="col text-white">{{ currency(cartTotalPrice) }}</span>
      </b-button>
    </div>
    <product-preview :product="selectProduct" ref="preview" />
    <cart ref="cart" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import StoreStatus from '@/components/StoreStatus.vue'
import Warning from '@/components/Warning.vue'
import Product from '@/components/Product.vue'
import ProductPreview from '@/components/ProductPreview.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'Home',
  components: {
    StoreStatus,
    Warning,
    Product,
    NavBar,
    ProductPreview,
    Cart
  },
  data: () => {
    return {
      products: null,
      selectProduct: null
    }
  },
  computed: {
    ...mapGetters('store', ['store']),
    ...mapGetters('cart', ['numberProducts', 'hasProducts', 'cartTotalPrice']),
    ...mapGetters('products', ['allProducts']),
    labelDistance() {
      return this.store?.distance
    },
    categories() {
      const uniqueCategories = new Set()

      this.allProducts.forEach(product => {
        uniqueCategories.add(product.category_name)
      })

      return Array.from(uniqueCategories).map(category => {
        return {
          name: category
        }
      })
    }
  },
  mounted() {
    this.getAllProducts()
  },
  methods: {
    ...mapActions('store', ['setDistance']),
    ...mapActions('products', ['getAllProducts']),
    goCart() {
      this.$refs['cart'].openModal()
    },
    showProduct(product) {
      this.$refs['preview'].openModal(product)
    },
    scrollToCategory(category) {
      const element = document.querySelector('[category="' + category.name + '"]');
      const headerOffset = 45;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="scss" scoped>

  .title {
    font-size: 1.7rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

  .categories {
    display: flex;
    overflow-x: auto;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;

    &::-webkit-scrollbar {
      display: none;
    }

    .category {
      padding: 10px 0;
      margin: 0 5px;

      &.active {
        border-bottom: 0.8px solid red;
      }
    }
  }


</style>