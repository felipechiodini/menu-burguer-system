<template>
  <div class="fullscreen-modal" :class="{ 'closed': value === false, 'opened': value === true }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    value: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>

  .fullscreen-modal {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow: auto;
  }

  .opened {
    animation: slide-up 0.3s ease-out forwards;
  }

  .closed {
    animation: slide-down 0.3s ease-out forwards;
  }

  @keyframes slide-down {
    0% {
      transform: translateY(0%);
    }

    100% {
      transform: translateY(100%);
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }

    100% {
      transform: translateY(0%);
    }
  }

</style>