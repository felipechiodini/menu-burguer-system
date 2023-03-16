<template>
  <div>
    <template v-if="loading === false">
      <router-view />
    </template>
    <template v-else>
      Carregando...
    </template>
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'
import Storage from '@/js/Storage'
import Api from '@/js/Api'

export default {
  components: {
    FloatButton
  },
  data: () => {
    return {
      loading: true
    }
  },
  async mounted() {
    this.loading = true

    try {
      const { data } = await Api.get('/store', {
        params: {
          slug: this.$route.params.store_slug
        }
      })
  
      Storage.set('store', data)
    } catch (error) {
      this.$router.push({ name: '404' })
    }

    this.loading = false
  }
}

</script>