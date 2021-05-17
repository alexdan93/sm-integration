<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header">
        Header
        <base-btn
          mode="light"
          class="wallet__login"
          @click="login()"
        >
          Login
        </base-btn>
      </div>
      <div class="template__content">
        <nuxt />
      </div>
      <div class="template__footer">
        Footer
      </div>
    </div>
    <base-modal-container />
    <loader-screen />
  </div>
</template>
<script>
export default {
  mounted() {
    // fake loader

    // const r = await web3init()
    // if (r.ok) {
    // initContracts()
    // }
  },
  methods: {
    async login() {
      try {
        this.SetLoader(true);
        await this.$store.dispatch('web3/login');
        await this.$store.dispatch('web3/initContracts');
        this.SetLoader(false);
      } catch (e) {
        console.log('Login error :', e);
        this.SetLoader(false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  overflow-y: auto;
  &__template {
    height: 100%;
    display: grid;
    grid-template-rows: 100px 1fr auto;
  }
}

.template {
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  &__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
}
</style>
