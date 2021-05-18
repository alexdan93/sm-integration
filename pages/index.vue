<template>
  <div />
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      userAddress: 'web3/getUserAddress',
    }),
  },
  created() {
    if (this.userAddress) {
      this.$router.push('wallet');
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
