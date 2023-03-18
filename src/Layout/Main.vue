<template>
  <div>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;" v-if="loading === true">
      <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
    </div>
    <div class="d-flex justify-content-center align-items-center text-center" style="height: 100vh;" v-else-if="loading === false && error === true">
      <div>
        <h5>Loja não encontrada</h5>
      </div>
    </div>
    <template v-if="loading === false">
      <router-view />
    </template>
  </div>
</template>

<script>
import Api from '@/js/Api'
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      loading: true,
      error: false
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

      this.setStore(data)
    } catch (error) {
      console.log(error)
      console.log('here')
      this.error = true
    }

    this.loading = false
  },
  methods: {
    ...mapActions('store', ['setStore'])
  }
}

</script>