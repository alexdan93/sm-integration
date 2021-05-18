import {
  initWeb3,
  getInstances,
  getBalance,
  getAllowance,
  getSymbol,
  getDecimals,
  setAllowance,
  transfer,
} from '~/plugins/web3';

export default {
  async login({ commit }) {
    const userAddress = await initWeb3();
    commit('setUserAddress', userAddress);
    return userAddress;
  },

  async initContracts({ commit }) {
    const contracts = await getInstances();
    commit('setContracts', contracts);
    return contracts;
  },

  async getBalance({ commit }, instance) {
    const balance = await getBalance(instance);
    commit('setBalance', balance);
    return balance;
  },

  async getAllowance({ commit }, instance, address) {
    const allowance = await getAllowance(instance, address);
    commit('setAllowance', allowance);
    return allowance;
  },

  async setAllowance({ commit }, instance, address, amount) {
    await setAllowance(instance, address, amount);
    commit('setAllowance', amount);
  },

  async getSymbol({ commit }, instance) {
    const symbol = await getSymbol(instance);
    commit('setSymbol', symbol);
    return symbol;
  },

  async getDecimals({ commit }, instance) {
    const decimals = await getDecimals(instance);
    commit('setDecimals', decimals);
    return decimals;
  },

  async transfer(instance, address, amount) {
    await transfer(instance, address, amount);
  },
};
