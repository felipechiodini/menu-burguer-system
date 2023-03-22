<template>
  <div v-if="modalOpen" class="fullscreen-modal">
    <b-button @click="goBack()" class="bg-primary text-white button-rounded">
      <span class="material-icons">arrow_back_ios_new</span>
    </b-button>
    <template v-if="step === 1">
      <step-one @next-step="nextStep()"></step-one>
    </template>
    <template v-else-if="step === 2">
      <step-two @next-step="nextStep()"></step-two>
    </template>
    <template v-else-if="step === 3">
      <step-three></step-three>
    </template>
  </div>
</template>

<script>
import StepOne from '@/components/Cart/StepOne.vue'
import StepTwo from '@/components/Cart/StepTwo.vue'
import StepThree from '@/components/Cart/StepThree.vue'
import FloatButton from '@/components/FloatButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  components: {
    StepOne,
    StepTwo,
    StepThree,
    FloatButton
  },
  data: () => {
    return {
      page: null,
      step: 1,
      modalOpen: false,
    }
  },
   watch: {
    'hasProducts': function(value) {
      if (value === false) this.closeModal()
    }
  },
  computed: {
    ...mapGetters('cart', ['numberProducts', 'hasProducts', 'cartTotalPrice'])
  },
  methods: {
    nextStep() {
      this.step++
    },
    openModal() {
      this.modalOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      document.body.style.overflow = ''
      this.modalOpen = false
    },
    goBack() {
      if (this.step === 1) {
        this.closeModal()
      } else {
        this.step--
      }
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
    background-color: #ffffff;
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

  .button-rounded {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    font-size: 1.6rem;
    top: 15px;
    left: 15px;
    border: none;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    overflow: hidden;
  }

</style>