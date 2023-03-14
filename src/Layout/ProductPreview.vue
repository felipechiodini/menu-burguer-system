<template>
  <div class="container-fluid p-0" style="padding-bottom: 60px !important;">
    <carousel :per-page="1" paginationPosition="bottom-overlay" :mouse-drag="false" class="mb-2">
      <slide>
        <img class="w-100" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg" alt="">
      </slide>
      <slide>
        <img class="w-100" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-1F2016F5CAB148D79B80EDCB829F792B.jpeg" alt="">
      </slide>
    </carousel>

    <div class="p-3 m-3 shadow-lg bg-white" style="border-radius: 10px !important;">
      <h4>Ordinary</h4>
      <p>Pão brioche, dois suculentos smashs burgers de 70g cada, duas fatias de queijo cheddar e molho especial.</p>
      <label for="dawfega" class="w-100 row align-items-center p-2 my-2 mx-0 border rounded pointer">
        <b-form-checkbox id="dawfega"></b-form-checkbox>
        <span class="col p-0">Pão sem glúten</span>
        <span class="col-auto">{{ currency(5) }}</span>
      </label>
    </div>
    
    <div class="row align-items-center justify-content-around m-0 w-100 py-2 shadow-lg bg-white" style="position: fixed; bottom: -1px; z-index: 2;">
      <div class="col-auto">
        <h4>{{ total }}</h4>
      </div>
      <div class="col-auto">
        <b-button size="sm" @click="decrement()">-</b-button>
        <strong class="mx-3">{{ counter }}</strong>   
        <b-button size="sm" @click="increment()">+</b-button>
      </div>
      <div class="col-auto">
        <b-button style="height: 50px; width: 50px; border-radius: 50%;">
          <b-icon icon="cart"></b-icon>
        </b-button>
      </div>
    </div>
    <float-button @click.native="$router.back()" size="small" position="top-left"></float-button>
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue';

export default {
  name: 'ProductPreview',
  components: {
    FloatButton,
  },
  data: () => {
    return {
      counter: 1,
      page: null,
    }
  },
  computed: {
    total() {
      return this.currency(this.counter * 20)
    }
  },
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      if (this.counter === 1) return
      this.counter--
    },
    addItem() {

    }
  }
}
</script>