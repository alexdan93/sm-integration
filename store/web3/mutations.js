export default {
  setData(state, { userAddress, instances }) {
    state.userAddress = userAddress;
    state.contracts = instances;
  },
  setBalance(state, payload) {
    state.balance = payload;
  },
  setAllowance(state, payload) {
    state.allowance = payload;
  },
  setContracts(state, payload) {
    state.contracts = payload;
  },
  setSymbol(state, payload) {
    state.symbol = payload;
  },
  setDecimals(state, payload) {
    state.decimals = payload;
  },
  setPickedData(state, { balance }) {
    state.pickedData.balance = balance;
  },
};
