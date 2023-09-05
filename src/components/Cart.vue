<template>
  <modal v-model="opened">
    <template v-if="step === 1">
      <step-one @go-back="closeModal()" @next-step="nextStep()" />
    </template>
    <template v-else-if="step === 2">
      <step-two @go-back="goBack()" @next-step="nextStep()" />
    </template>
    <template v-else-if="step === 3">
      <step-three @go-back="goBack()" @next-step="nextStep()" />
    </template>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import StepOne from '@/components/Cart/StepOne.vue'
import StepTwo from '@/components/Cart/StepTwo.vue'
import StepThree from '@/components/Cart/StepThree.vue'
import FloatButton from '@/components/FloatButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  components: {
    Modal,
    StepOne,
    StepTwo,
    StepThree,
    FloatButton
  },
  data: () => {
    return {
      step: 1,
      opened: false,
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
  mounted() {
    this.$root.$on('child2', () => console.log('uidwahufa'));
  },
  methods: {
    nextStep() {
      this.step++
    },
    openModal() {
      this.opened = true
    },
    closeModal() {
      this.opened = false
    },
    goBack() {
      this.step--
    }
  }
}
</script>
