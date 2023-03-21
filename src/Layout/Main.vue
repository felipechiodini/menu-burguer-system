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
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('store', ['loading', 'error'])
  },
  mounted() {
    this.loadDistance()
    this.loadStore()
  },
  methods: {
    ...mapActions('store', ['loadStore', 'loadDistance']),
  }
}

</script>