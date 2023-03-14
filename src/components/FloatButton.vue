<template>
  <div :class="[position, size]" class="button shadow">
  </div>
</template>

<script>
  export default {
    name: 'FloatButton',
    props: {
      icon: {
        type: String
      },
      position: {
        type: String
      },
      size: {
        type: String
      }
    }
  }
</script>

<style scoped>

  .small {
    height: 50px;
    width: 50px;
  }

  .medium {
    height: 60px;
    width: 60px;
  }

  .large {
    height: 70px;
    width: 70px;
  }

  .top-left {
    top: 10px;
    left: 10px;
  }
  
  .bottom-right {
    right: 15px;
    bottom: 15px;
  }

  .button {
    position: fixed;
    border-radius: 50px;
    background-color: brown;
    padding: 12px;
    font-size: 25px;
    color: white;
  }

</style>