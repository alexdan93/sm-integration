<template>
  <a
    v-if="link !== ''"
    class="base-btn"
    :class="btnClass"
    :href="link"
    target="_blank"
  >
    <slot />
  </a>
  <nuxt-link
    v-else-if="nuxtLink !==''"
    class="base-btn"
    :class="btnClass"
    :to="nuxtLink"
  >
    <slot />
  </nuxt-link>
  <button
    v-else
    class="base-btn"
    :class="btnClass"
    @click.stop="$emit('click')"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    nuxtLink: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClass() {
      const { mode, disabled } = this;
      return [
        { 'base-btn_disabled': mode === 'disabled' || disabled },
        { 'base-btn_light': mode === 'light' },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.base-btn {
  padding: 0 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
  background: #d43333;
  &:hover {
    color: #FFFFFF;
    background: #b34165;
  }
  &_disabled {
    pointer-events: none;
  }
  &_light {
    width: 187px;
    height: 50px;
    background: #3387a3;
    color: #fff;
    transition: .6s;
    &:hover {
    background-color: #247f9e;
  }
  }
}
</style>
