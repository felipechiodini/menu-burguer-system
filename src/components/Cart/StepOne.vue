<template>
  <div class="container">
    <div class="row mx-1 mt-4 mb-3 border align-items-center item">
      <img class="image m-2" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg">
      <div style="display: flex; flex-direction: column; justify-content: space-around;">
        <span class="mb-4">Ordinary</span>
        <span class="">{{ currency(30) }}</span>
      </div>
      <div class="col">
        <b-button variant="transparent" size="sm" @click="decrement()">-</b-button>
        <strong class="mx-3">{{ counter }}</strong>   
        <b-button variant="transparent" size="sm" @click="increment()">+</b-button>
      </div>
    </div>
    
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg" style="position: fixed; bottom: -1px; z-index: 2;">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(80) }}</td>
        </tr>
        <tr>
          <td>Entrega</td>
          <td align="right">{{ currency(5) }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ currency(85) }}</td>
        </tr>
      </table>
      <b-button class="border-none bg-primary btn-add" @click="goAddress()">
        <span class="text-white">Continuar</span>
      </b-button>
    </div>

  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'

export default {
  components: {
    FloatButton
  },
  data: () => {
    return {
      counter: 1
    }
  },
  methods: {
    goAddress() {
      this.$emit('next-step')
    }
  }

}
</script>

<style lang="scss" scoped>

  .resume-table {
    width: 90%;
    font-size: 13px;
    margin-bottom: 7px;

    & td {
      padding: 6px 0;
    }

    & .total {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .image {
    border-radius: 5px;
    height: 100px;
    width: 100px;
    object-fit: cover;
  }

  .item {
    border-radius: 5px;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

</style>