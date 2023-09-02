<template>
  <div class="fullscreen-modal" :class="{ 'closed': modalOpen === false, 'opened': modalOpen === true }">
    <div v-if="loading === false">
      <carousel :per-page="1" paginationPosition="bottom-overlay" :mouse-drag="false" class="mb-2">
        <slide v-for="(photo, key) in product.photos" :key="key">
          <img class="w-100" :src="photo.src">
        </slide>
      </carousel>
      <div class="p-3 display" style="height: 580px; overflow: auto;">
        <h4 class="product-title">{{ product.name }}</h4>
        <p class="product-description">{{ product.description }}</p>
        <h4 class="my-3">Adicionais</h4>
        <label :for="id(additional.name)" class="w-100 row align-items-center p-2 my-2 mx-0 border rounded pointer" v-for="(additional) in product.additionals" :key="id(additional)">
          <b-form-checkbox :for="id(additional.name)"></b-form-checkbox>
          <span class="col p-0">{{ additional.name }}</span>
          <span class="col-auto">+ {{ currency(additional.value) }}</span>
          <b-button size="sm" variant="transparent" >-</b-button>
          <b-button size="sm" variant="transparent" >+</b-button>
        </label>
        <h4 class="my-3">Substituições</h4>
        <label :for="id(replacement.name)" class="w-100 row align-items-center p-2 my-2 mx-0 border rounded pointer" v-for="(replacement) in product.replacements" :key="id(replacement)">
          <b-form-checkbox :id="id(replacement.name)"></b-form-checkbox>
          <span class="col p-0">{{ replacement.name }}</span>
          <span class="col-auto">+ {{ currency(replacement.value) }}</span>
        </label>
        <h4 class="mt-4 mb-2">Alguma Observação?</h4>
        <textarea v-model="observation" placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne, etc." rows="2" class="textarea"></textarea>
      <div class="row align-items-center border-top justify-content-around m-0 w-100 py-3 shadow bg-white" style="z-index: 10; bottom: 0; position: fixed; left: 0;">
        <div class="col-auto">
          <b-button variant="transparent" size="sm" @click="decrement()">-</b-button>
          <strong class="mx-3">{{ counter }}</strong>   
          <b-button variant="transparent" size="sm" @click="increment()">+</b-button>
        </div>
        <b-button class="border-none bg-primary btn-add" @click="addToCart()">
          <span class="text-white mr-4">Adicionar</span>
          <span class="text-white">{{ total }}</span>
        </b-button>
      </div>
      </div>
      <b-button @click="closeModal()" class="bg-primary text-white button-rounded">
        <span class="material-icons">arrow_back_ios_new</span>
      </b-button>
    </div>
    <div class="d-flex justify-content-center align-items-center h-100" v-else>
      <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
    </div>
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
      loading: false,
      modalOpen: false,
      product: null,
      observation: null,
    }
  },
  computed: {
    total() {
      return this.currency(this.counter * this.product.price)
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
    addToCart() {
      this.$store.dispatch('cart/addProductToCart', {
        id: this.product.id,
        observation: this.observation,
        count: this.counter,
        additionals: {},
        replacements: {}
      })

      this.closeModal()
    },
    id(item) {
      return `${item.name}-${item.id}`
    },
    async openModal(product) {
      this.modalOpen = true
      this.loading = true
      const { data } = await Api.get(`/product/${product.id}`)
      this.product = data.product
      document.body.style.overflow = 'hidden'
      this.loading = false
    },
    closeModal() {
      document.body.style.overflow = ''
      this.modalOpen = false
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