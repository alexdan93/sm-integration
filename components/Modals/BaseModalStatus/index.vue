<template>
  <base-modal-box :title="'Error'">
    <div class="base-modal__content base-modal__text status__text">
      <span>{{ options.text }}</span>
    </div>
  </base-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
};
</script>

<style scoped lang="scss">
.status {
  &__text {
    margin-bottom: 10px;
  }
}
.base-modal {
  @include modalKit;
}
</style>
