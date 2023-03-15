<template>
  <div>
    <float-button @click.native="$router.back()" class="bg-primary" size="small" position="top-left" icon="back-icon" />
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
    }
  },
  methods: {
    nextStep() {
      this.step++
    }
  }
}
</script>
