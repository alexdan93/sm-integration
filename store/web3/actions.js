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
    const { userAddress, instances } = await initWeb3();
    commit('setData', {
      userAddress,
      instances,
    });
  },

  async initContracts({ commit }) {
    const contracts = await getInstances();
    commit('setContracts', contracts);
    return contracts;
  },

  async getBalance({ commit }) {
    const balance = await getBalance();
    commit('setBalance', balance);
    return balance;
  },

  async getAllowance({ commit }, { instance, address }) {
    const allowance = await getAllowance(instance, address);
    commit('setAllowance', allowance);
  },

  async setAllowance({ commit }, { instance, address, amount }) {
    await setAllowance(instance, address, amount);
    commit('setAllowance', amount);
  },

  async getSymbol({ commit }) {
    const symbol = await getSymbol();
    commit('setSymbol', symbol);
    return symbol;
  },

  async getDecimals({ commit }) {
    const decimals = await getDecimals();
    await commit('setDecimals', decimals);
    return decimals;
  },

  async transfer({ commit }, { instance, address, amount }) {
    await transfer(instance, address, amount);
  },

  setPickedData({ commit }, payload) {
    return commit('setPickedData', payload);
  },
};
