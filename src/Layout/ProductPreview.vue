<template>
  <div class="container-fluid p-0" style="position: relative; padding-bottom: 60px !important; z-index: 1;" v-if="product">
    <carousel :per-page="1" paginationPosition="bottom-overlay" :mouse-drag="false" class="mb-2">
      <slide v-for="(photo, key) in product.photos" :key="key">
        <img class="w-100" :src="photo.src">
      </slide>
    </carousel>
    <div class="p-3 display">
      <h4 class="product-title">{{ product.name }}</h4>
      <p class="product-description">{{ product.description }}</p>
      <label for="dawfega" class="w-100 row align-items-center p-2 my-2 mx-0 border rounded pointer">
        <b-form-checkbox id="dawfega"></b-form-checkbox>
        <span class="col p-0">Pão sem glúten</span>
        <span class="col-auto">{{ currency(5) }}</span>
      </label>
      <div>
        <h4 class="mt-4 mb-2">Alguma Observação?</h4>
        <textarea placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne, etc." rows="2" class="textarea"></textarea>
      </div>
    </div>
    <div class="row align-items-center border-top justify-content-around m-0 w-100 py-3 shadow" style="position: fixed; bottom: -1px; z-index: 2;">
      <div class="col-auto">
        <b-button variant="transparent" size="sm" @click="decrement()">-</b-button>
        <strong class="mx-3">{{ counter }}</strong>   
        <b-button variant="transparent" size="sm" @click="increment()">+</b-button>
      </div>
      <b-button class="border-none bg-primary btn-add">
        <span class="text-white mr-4">Adicionar</span>
        <span class="text-white">{{ total }}</span>
      </b-button>
    </div>
    <float-button @click.native="$router.back()" class="bg-primary" size="small" position="top-left" icon="back-icon" />
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue';
import Api from '@/js/Api';

export default {
  name: 'ProductPreview',
  components: {
    FloatButton,
  },
  data: () => {
    return {
      counter: 1,
      page: null,
      product: null,
    }
  },
  computed: {
    total() {
      return this.currency(this.counter * this.product.price)
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const { data } = await Api.get(`/product/${this.$route.params.product_id}`)
      this.product = data
    },
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

<style scoped>
  .textarea {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #575757;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3rem;
    letter-spacing: 0.7px;
  }

  .btn-add {
    width: 200px;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

  .product-title {
    color: #161616;
    font-size: 2.2rem;
    margin: 5px 0 15px 0;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .product-description {
    color: #575757;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3rem;
    letter-spacing: 0.7px;
  }

  .display {
    position: absolute;
    background-color: #fff;
    border-top-left-radius: 30px !important;
    border-top-right-radius: 30px !important;
    margin-top: -35px;
    z-index: 2;
  }

</style>