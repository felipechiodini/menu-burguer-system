<template>
  <div class="d-flex align-items-center">
    <b-icon :class="{ 'text-success': status, 'text-danger': !status }" icon="circle-fill"></b-icon>
    <span class="ml-2">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean
    }
  },
  computed: {
    label() {
      return this.status ? 'Aberto' : 'Fechado'
    }
  }
}
</script>

<style>

</style>