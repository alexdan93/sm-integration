import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import { ERC20 } from '~/abi/ERC20.js';

const web4 = new Web4();
let web3;
let userAddress;
let instances;

export const output = (res) => ({
  ok: true,
  result: res,
});

export const error = (code, msg = '', data) => ({
  ok: false,
  code,
  msg,
  data,
});

// eslint-disable-next-line
export const initWeb3 = async () => {
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);

      if ((await web3.eth.getCoinbase()) === null) {
        await window.ethereum.enable();
      }

      userAddress = await web3.eth.getCoinbase();
      web4.setProvider(window.ethereum, userAddress);
      return userAddress;
    }
    // eslint-disable-next-line
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  } catch (e) {
    console.log('initWeb3 error: ', e);
    throw new Error(e);
  }
};

export const getInstances = async () => {
  try {
    const abi = await web4.getContractAbstraction(ERC20);
    const contracts = [
      '0x4b107a23361770534bd1839171bbf4b0eb56485c',
      '0xc13da4146d381c7032ca1ed6050024b4e324f4ef',
      '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819',
      '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13',
    ];

    instances = await Promise.all(
      contracts.map((el) => abi.getInstance(el)),
    );
    return instances;
  } catch (e) {
    console.log('getInstances error', e);
    throw e;
  }
};

export const getBalance = async (instance) => {
  try {
    return await instance.balanceOf(userAddress);
  } catch (e) {
    console.log('getBalance error', e);
    throw e;
  }
};

export const getAllowance = async (instance, address) => {
  try {
    return await instance.allowance(userAddress, address);
  } catch (e) {
    console.log('getAllowance error', e);
    throw e;
  }
};

export const getSymbol = async (instance) => {
  try {
    return await instance.symbol();
  } catch (e) {
    console.log('getSymbol error', e);
    throw e;
  }
};

export const getDecimals = async (instance) => await instance.decimals();

export const setAllowance = async (instance, address, amount) => await instance.approve(address, amount);

export const transfer = async (instance, address, amount) => await instance.transfer(address, amount);
