<template>
  <div>
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import FloatButton from '@/components/FloatButton.vue'

export default {
  components: {
    NavBar,
    SideBar,
    FloatButton
  }
}

</script>