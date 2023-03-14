<template>
  <div class="row my-2 mx-3 rounded shadow" @click="open()">
    <img class="w-100 rounded" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg" alt="">
    <div class="px-2 py-2">
      <h3 style="font-size: 1.7rem;">{{ product.name }}</h3>
      <p class="my-3">{{ product.description }}</p>
      <h5 style="font-size: 1.4rem;">{{ currency(27) }}</h5>   
    </div>
  </div>
</template>

<script>

export default {
  props: {
    product: []
  },
  methods: {
    open() {
      this.$router.push({
        name: 'product.preview',
        params: {
          id: 1
        }
      })
    }
  }
}
</script>

<style>

</style>