<template>
  <div class="wallet">
    <div class="wallet__amount">
      <span>Amount</span>
      <div class="wallet__field">
        <input
          v-model="amount"
          class="wallet__input"
          type="text"
        >
        <base-dd
          class="wallet__dd"
          :options="currencies"
          @click="setData($event)"
        />
      </div>
    </div>
    <div class="wallet__address">
      <span>Address</span>
      <div class="wallet__field">
        <input
          v-model="address"
          class="wallet__input"
          type="text"
        >
      </div>
    </div>
    <div class="wallet__stats">
      <span class="wallet__text">balance</span>
      <span class="wallet__text">{{ balance }}</span>
      <span class="wallet__text">allowance</span>
      <span class="wallet__text">{{ allowance }}</span>
    </div>
    <div class="wallet__actions">
      <base-btn
        mode="light"
        @click="getCurrentCurrency()"
      >
        Get allowance
      </base-btn>
      <base-btn mode="light">
        Set allowance
      </base-btn>
      <base-btn mode="light">
        Transfer
      </base-btn>
    </div>
    <div class="wallet__trx">
      table
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      amount: 0,
      address: '',
      balances: [],
      currentCurrency: 'BUSD',
      currencies: [],
      allowances: [],
    };
  },
  computed: {
    ...mapGetters({
      balance: 'web3/getBalance',
      allowance: 'web3/getAllowance',
      contracts: 'web3/getContracts',
      userAddress: 'web3/getUserAddress',
      symbol: 'web3/getSymbol',
    }),
  },
  mounted() {
    this.getCurrencies();
    this.getBalances();
    this.getAllowances();
    this.address = this.userAddress;
  },
  methods: {
    async getCurrencies() {
      this.currencies = await Promise.all(
        this.contracts.map((el) => this.$store.dispatch('web3/getSymbol', el)),
      );
    },
    async getBalances() {
      this.balances = await Promise.all(
        this.contracts.map((el) => this.$store.dispatch('web3/getBalance', el)),
      );
    },
    async getAllowances() {
      this.allowances = await Promise.all(
        this.contracts.map((el) => this.$store.dispatch('web3/getAllowance', el)),
      );
    },
    async setData(symbol) {
      const idx = this.currencies.indexOf(symbol);
      await Promise.all([
        this.$store.dispatch('web3/getSymbol', this.contracts[idx]),
        this.$store.dispatch('web3/getAllowance', this.contracts[idx], this.address),
        this.$store.dispatch('web3/getDecimals', this.contracts[idx]),
        this.$store.dispatch('web3/getBalance', this.contracts[idx]),
      ]);
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 300px;

  &__amount {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  &__address {
    margin: 30px 0;
  }

  &__field {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__input {
    width: 600px;
    height: 40px;
    background: #F3F5FA;
    border: none;
  }

  &__stats {
    margin: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  &__actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__trx {
    margin: 50px 0;
  }
}
</style>
