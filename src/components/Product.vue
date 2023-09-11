<template>
  <div class="d-flex border-top">
    <div class="col p-2">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="my-2 text-muted">{{ product.description }}</p>
      <h5 style="font-size: 1.4rem;">{{ currency(product.price) }}</h5>   
    </div>
    <img class="wioahfgowaf" :src="product.photo.src">
  </div>
</template>

<script>

export default {
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
    text-transform: capitalize;
    font-size: 1.7rem;
  }

</style>
