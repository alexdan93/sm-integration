import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import { ERC20 } from '~/abi/ERC20.js';

let web3;
let userAddress;
let instances;

const getInstances = async () => {
  const web4 = new Web4();
  web4.setProvider(window.ethereum, userAddress);
  const abi = await web4.getContractAbstraction(ERC20);
  const contracts = [
    '0x4b107a23361770534bd1839171bbf4b0eb56485c',
    '0xc13da4146d381c7032ca1ed6050024b4e324f4ef',
    '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819',
    '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13',
  ];
  const inst = await Promise.all(
    contracts.map((el) => abi.getInstance(el)),
  );
  return inst;
};

// eslint-disable-next-line
export const initWeb3 = async () => {
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);

      if ((await web3.eth.getCoinbase()) === null) {
        await window.ethereum.enable();
        userAddress = await web3.eth.getCoinbase();
      } else {
        userAddress = await web3.eth.getCoinbase();
      }
      instances = await getInstances();
      return { userAddress, instances };
    }
    // eslint-disable-next-line
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  } catch (e) {
    console.log('initWeb3 error: ', e);
    throw new Error(e);
  }
};

export const getBalance = async () => {
  try {
    return await Promise.all(instances.map((el) => el.balanceOf(userAddress).then((res) => res.toString())));
  } catch (e) {
    console.log('getBalance error', e);
    throw e;
  }
};

export const getAllowance = async (instance, address) => {
  try {
    return await instance.allowance(userAddress, address).then((res) => res.toString());
  } catch (e) {
    console.log('getAllowance error', e);
    throw e;
  }
};

export const getSymbol = async () => {
  try {
    return await Promise.all(instances.map((el) => el.symbol().then((res) => res.toString())));
  } catch (e) {
    console.log('getSymbol error', e);
    throw e;
  }
};

export const getDecimals = async () => {
  try {
    return Promise.all(instances.map((el) => el.decimals().then((res) => res.toString())));
  } catch (e) {
    console.log('getDecimals error', e);
    return e;
  }
};

export const setAllowance = async (instance, address, amount) => {
  try {
    return await instance.approve(address, amount);
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const transfer = async (instance, address, amount) => {
  try {
    return await instance.transfer(address, amount);
  } catch (e) {
    console.log(e);
    return e;
  }
};
