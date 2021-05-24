<template>
  <div
    v-if="userAddress"
    class="wallet"
  >
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
          :placeholder="userAddress"
          class="wallet__input"
          type="text"
        >
      </div>
    </div>
    <div class="wallet__stats">
      <span class="wallet__text">balance</span>
      <span class="wallet__text">{{ balanceFromDecimals(balances[idx]) || 0 }}</span>
      <span class="wallet__text">allowance</span>
      <span class="wallet__text">{{ allowance || "" }}</span>
    </div>
    <div class="wallet__actions">
      <base-btn
        mode="light"
        @click="updateWallet()"
      >
        Update wallet
      </base-btn>
      <base-btn
        mode="light"
        @click="setAllowance()"
      >
        Set allowance
      </base-btn>
      <base-btn
        mode="light"
        @click="transfer()"
      >
        Transfer
      </base-btn>
    </div>
    <div class="wallet__trx">
      table
    </div>
  </div>
  <div
    v-else
    class="not-logged"
  >
    <base-btn
      mode="light"
      @click="login()"
    >
      Please, login with metamask
    </base-btn>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import BigNumber from 'bignumber.js';

export default {
  data() {
    return {
      amount: 0,
      address: '0xBC6ae91F55af580B4C0E8c32D7910d00D3dbe54d',
      currentCurrency: 'BUSD',
      currencies: [],
      decimals: [],
      idx: null,
    };
  },
  computed: {
    ...mapGetters({
      balances: 'web3/getBalance',
      contracts: 'web3/getContracts',
      allowance: 'web3/getAllowance',
      userAddress: 'web3/getUserAddress',
      symbol: 'web3/getSymbol',
      pickedData: 'web3/getPickedData',
      decimal: 'web3/getDecimals',
    }),
  },
  methods: {
    async login() {
      try {
        this.SetLoader(true);
        await this.getData();
        this.SetLoader(false);
      } catch (e) {
        console.log('Login error :', e);
        this.SetLoader(false);
      }
    },
    async getCurrencies() {
      this.currencies = await this.$store.dispatch('web3/getSymbol');
    },
    async getBalances() {
      await this.$store.dispatch('web3/getBalance');
    },
    async updateWallet() {
      if (this.idx !== null && this.address !== '') {
        this.SetLoader(true);
        await this.$store.dispatch('web3/getAllowance', {
          instance: this.contracts[this.idx],
          address: this.address,
        });
        await this.getBalances();
      }
      this.SetLoader(false);
    },
    async getDecimals() {
      this.decimals = await this.$store.dispatch('web3/getDecimals');
    },
    async getData() {
      await this.$store.dispatch('web3/login');
      await Promise.all([
        this.getCurrencies(),
        this.getBalances(),
        this.getDecimals(),
      ]);
    },
    balanceFromDecimals(balance) {
      if (!balance) return 0;
      return new BigNumber(parseInt(balance, 10)).shiftedBy(-this.decimals[this.idx]).toFixed(4);
    },
    async setData(symbol) {
      this.idx = this.currencies.indexOf(symbol);
      await this.$store.dispatch('web3/setPickedData', {
        balance: this.balanceFromDecimals(this.balances[this.idx]),
      });
    },
    async setAllowance() {
      if (this.amount <= 0 && this.address !== '') {
        await this.$store.dispatch('web3/setAllowance', {
          instance: await this.contracts[this.idx],
          address: this.address,
          amount: this.amount,
        });
      }
    },
    async transfer() {
      if (this.amount <= 0 && this.address !== '') {
        await this.$store.dispatch('web3/transfer', {
          instance: await this.contracts[this.idx],
          address: this.address,
          amount: new BigNumber(this.amount).shiftedBy(parseInt(this.decimals[this.idx], 10)),
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  margin-top: 80px;
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

.not-logged {
  margin-top: 80px;
}
</style>
