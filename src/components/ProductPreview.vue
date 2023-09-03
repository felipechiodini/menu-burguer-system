<template>
  <div class="fullscreen-modal" :class="{ 'closed': modalOpen === false, 'opened': modalOpen === true }">
    <div v-if="loading === false && modalOpen === true">
      <carousel :per-page="1" paginationPosition="bottom-overlay" :mouse-drag="false">
        <slide v-for="(photo, key) in product.photos" :key="key">
          <img class="w-100" :src="photo.src">
        </slide>
      </carousel>
      <div class="p-3 ">
        <h4 class="product-title">{{ product.name }}</h4>
        <p class="product-description">{{ product.description }}</p>
        <h4 class="my-3">Adicionais</h4>
        <div class="row w-100 align-items-center p-2 my-2 mx-0 border rounded pointer" v-for="(additional, key) in product.additionals" :key="additional.id + additional.name + key" @click="inscreaseAdditional(additional)">
          <div class="col-auto p-0">
            <div class="mb-2">{{ additional.name }}</div>
            <div><span style="font-size: 14px;">+ {{ currency(additional.value) }}</span></div>
          </div>
          <div class="ml-auto">
            <b-button size="sm" variant="transparent" v-if="additionalAmount(additional)" @click.stop="decreaseAdditional(additional)">-</b-button>
            <strong class="mx-3" v-if="additionalAmount(additional)">{{ additionalAmount(additional) }}</strong>
            <b-button size="sm" variant="transparent">+</b-button>
          </div>
        </div>

        <h4 class="my-3">Substituições</h4>
        <div
          class="row w-100 align-items-center p-2 my-2 mx-0 border rounded pointer"
          v-for="(replacement, key) in product.replacements"
          :key="replacement.id + replacement.name + key"
          @click="addOrRemoveReplacement(replacement)"
          :class="{ 'bg-primary': replacementAmount(replacement) }"
        >
          <div class="col-auto p-0">
            <div class="mb-2">{{ replacement.name }}</div>
            <div>+ {{ currency(replacement.value) }}</div>
          </div>
        </div>

        <h4 class="mt-4 mb-2">Alguma Observação?</h4>
        <textarea v-model="observation" placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne, etc." rows="2" class="textarea" />
      
      </div>
      <b-button @click="closeModal()" class="bg-primary text-white button-rounded">
        <span class="material-icons">arrow_back_ios_new</span>
      </b-button>
      <div class="row align-items-center border-top justify-content-around m-0 w-100 py-3 shadow bg-white" style="z-index: 1000; bottom: 0; position: sticky; left: 0;">
        <div class="col-auto">
          <b-button variant="transparent" size="sm" @click="decrement()">-</b-button>
          <strong class="mx-3">{{ counter }}</strong>   
          <b-button variant="transparent" size="sm" @click="increment()">+</b-button>
        </div>
        <b-button class="border-none bg-primary btn-add" @click="addToCart()">
          <span class="text-white mr-4">Adicionar</span>
          <span class="text-white">{{ currency(total) }}</span>
        </b-button>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center h-100" v-else-if="loading === true">
      <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
    </div>
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'
import Api from '@/js/Api'
import { mapActions } from 'vuex'

export default {
  name: 'ProductPreview',
  components: {
    FloatButton,
  },
  data: () => {
    return {
      product: null,
      counter: 1,
      loading: false,
      modalOpen: false,
      observation: null,
      additionals: [],
      replacements: []
    }
  },
  computed: {
    total() {
      return (this.product.price + this.additionalsTotal + this.replacementTotal) * this.counter
    },
    additionalsTotal() {
      return this.additionals.reduce((acumulator, additional) => acumulator += additional.price * additional.amount, 0)
    },
    replacementTotal() {
      return this.replacements.reduce((acumulator, replacement) => acumulator += replacement.price, 0)
    }
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    addToCart() {
      this.addProductToCart({
        id: this.product.id,
        count: this.counter,
        observation: this.observation,
        additionals: this.additionals,
        replacements: this.replacements
      })

      this.closeModal()
    },
    increment() {
      this.counter++
    },
    decrement() {
      if (this.counter === 1) return
      this.counter--
    },
    inscreaseAdditional(additional) {
      const current = this.additionals.find(item => item.id === additional.id)

      if (current !== undefined) {
        current.amount++
      } else {
        this.additionals.push({ id: additional.id, price: additional.value, amount: 1 })
      }
    },
    decreaseAdditional(additional) {
      const current = this.additionals.find(item => item.id === additional.id)
      current.amount--
    },
    additionalAmount(additional) {
      return this.additionals.find(item => item.id === additional.id)?.amount ?? 0
    },
    addOrRemoveReplacement(replacement) {
      const current = this.replacements.find(item => item.id === replacement.id)

      if (current === undefined) {
        this.replacements.push({ id: replacement.id, price: replacement.value })
      } else {
        this.replacements = this.replacements.filter(i => i.id !== replacement.id)
      }
    },
    replacementAmount(replacement) {
      return this.replacements.find(item => item.id === replacement.id) ? true : false
    },
    openModal(product) {
      this.modalOpen = true
      this.loading = true
      Api.get(`/product/${product.id}`).then(({ data }) => {
        this.product = data.product
        document.body.style.overflow = 'hidden'
      }).finally(() => {
        this.loading = false
      })
    },
    closeModal() {
      document.body.style.overflow = ''
      this.modalOpen = false
      this.product = null,
      this.counter = 1
      this.loading = false
      this.modalOpen = false
      this.observation = null
      this.additionals = []
      this.replacements = []
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