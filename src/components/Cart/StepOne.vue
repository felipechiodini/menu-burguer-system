<template>
  <div class="row align-items-center shadow rounded m-3">
    <div class="col p-0">
      <img class="rounded" style="height: 100px; width: 100px; object-fit: cover;"
        src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg"
        alt="">
    </div>
    <div class="col">
      <span>Ordinary</span>
    </div>
    <div class="col">
      <span>{{ currency(30) }}</span>
    </div>
    <hr class="mx-3">
    <div class="row p-0 m-0">
      <h3 class="ml-auto">Total: {{ currency(90) }}</h3>
    </div>
    <float-button @click.native="goAddress()" size="large" position="bottom-right" />
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'

export default {
  components: {
    FloatButton
  },
  methods: {
    goAddress() {
      this.$emit('next-step')
    }
  }

}
</script>

<style>

</style>