<template>
  <div class="d-flex border-top">
    <div class="col p-2">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="my-2 text-muted">{{ product.description }}</p>
      <price :price="product.price" />
    </div>
    <img class="wioahfgowaf" :src="product.photo.src">
  </div>
</template>

<script>
import Price from './Price.vue'

export default {
  components: {
    Price
  },
  props: {
    product: {
      type: Object
    }
  }
}
</script>

<style scoped>

  .wioahfgowaf {
    margin-right: 15px;
    border-radius: 5px;
    align-self: center;
    object-fit: cover;
    height: 100px;
    width: 100px;
  }

  .product-title {
    font-size: 1.7rem;
  }

</style>
