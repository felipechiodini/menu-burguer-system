<template>
  <div class="row rounded shadow">
    <img class="w-100 rounded" :src="product.main_photo.src">
    <div class="px-2 py-2">
      <h3 style="font-size: 1.7rem;">{{ product.name }}</h3>
      <p class="my-3">{{ product.description }}</p>
      <h5 style="font-size: 1.4rem;">{{ currency(product.price) }}</h5>   
    </div>
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
