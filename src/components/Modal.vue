<template>
  <div v-if="modalOpen" class="fullscreen-modal">
    <div class="modal-content">
      <slot name="header">
      </slot>

      <slot name="body">
      </slot>

      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data: () => {
    return {
      modalOpen: false
    }
  },
  methods: {
    openModal() {
      document.body.style.overflow = 'hidden'
      this.modalOpen = true
    },
    closeModal() {
      document.body.style.overflow = ''
      this.modalOpen = false
    }
  }
}
</script>

<style scoped>

  .fullscreen-modal {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: slide-up 0.3s ease-out forwards;
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