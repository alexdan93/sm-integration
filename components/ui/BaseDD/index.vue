<template>
  <div class="dd">
    <b-dropdown
      id="dropdown-left m-2"
      class="dd__title"
      :text="selected"
      variant="primary"
      @click="$emit('click')"
    >
      <b-dropdown-item
        v-for="(item, i) in options"
        :key="i"
        href="#"
        @click="selected = item"
      >
        {{ item }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
