<template>
  <div class="dd">
    <b-dropdown
      id="dropdown-left m-2"
      class="dd__title"
      :text="selected"
      variant="primary"
    >
      <b-dropdown-item
        v-for="(item, i) in options"
        :key="i"
        href="#"
        @click="selectItem(item)"
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
  },
  data() {
    return {
      selected: '',
    };
  },
  methods: {
    selectItem(item) {
      this.selected = item;
      this.$emit('click', item);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
