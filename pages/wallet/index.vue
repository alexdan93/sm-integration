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
      <span class="wallet__text">{{ pickedData.balance }}</span>
      <span class="wallet__text">allowance</span>
      <span class="wallet__text">{{ allowances[idx] || "" }}</span>
    </div>
    <div class="wallet__actions">
      <base-btn
        mode="light"
        @click="getAllowance()"
      >
        Get allowance
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
      balances: [],
      currentCurrency: 'BUSD',
      currencies: [],
      decimals: [],
      allowances: [],
      idx: null,
    };
  },
  computed: {
    ...mapGetters({
      balance: 'web3/getBalance',
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
      this.balances = await this.$store.dispatch('web3/getBalance');
    },
    async getAllowance() {
      if (this.idx !== null && this.address !== '') {
        try {
          this.allowances[this.idx] = await this.$store.dispatch('web3/getAllowance', {
            instance: this.contracts[this.idx],
            address: this.address,
          });
        } catch (e) {
          console.log(e);
          throw new Error(e);
        }
      }
    },
    async getDecimals() {
      this.decimals = await this.$store.dispatch('web3/getBalance');
    },
    async getData() {
      await Promise.all([
        this.$store.dispatch('web3/login'),
        this.$store.dispatch('web3/initContracts'),
        this.getCurrencies(),
        this.getBalances(),
        this.getDecimals(),
      ]);
    },
    balanceFromDecimals(balance, coin) {
      if (coin === 'CFi') {
        return new BigNumber(balance).shiftedBy(-18).toFixed(4);
      } if (coin === 'VEE') {
        return new BigNumber(balance).shiftedBy(-18).toFixed(4);
      } if (coin === 'USDT') {
        return new BigNumber(balance).shiftedBy(-6).toFixed(4);
      } if (coin === 'DLD') {
        return new BigNumber(balance).shiftedBy(-18).toFixed(4);
      }
      return balance;
    },
    async setData(symbol) {
      this.idx = this.currencies.indexOf(symbol);
      await this.$store.dispatch('web3/setPickedData', {
        balance: this.balanceFromDecimals(this.balances[this.idx], symbol),
      });
    },
    async setAllowance() {
      try {
        await this.$store.dispatch('web3/setAllowance', {
          instance: await this.contracts[this.idx],
          address: this.address,
          amount: this.amount,
        });
      } catch (e) {
        console.log(e);
        return e;
      }
      return 'ok';
    },
    async transfer() {
      await this.$store.dispatch('web3/transfer', {
        instance: await this.contracts[this.idx],
        address: this.address,
        amount: this.amount,
      });
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
