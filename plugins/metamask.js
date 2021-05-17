import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import { ERC20 } from '~/abi/ERC20.js';

const web4 = new Web4();
let web3;
let userAddress;
const abi = web4.getContractAbstraction(ERC20);
const wallets = [
  '0x4b107a23361770534bd1839171bbf4b0eb56485c',
  '0xc13da4146d381c7032ca1ed6050024b4e324f4ef',
  '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819',
  '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13',
];

wallets.map(async (el) => await abi.getInstance(el));

export const output = (res) => ({
  ok: true,
  result: res,
})

export const error = (code, msg = '', data) => ({
  ok: false,
  code,
  msg,
  data,
})

// eslint-disable-next-line
export const Web3Login = async () => {
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      // userAddress = web3.eth.getCoinbase()

      if ((await web3.eth.getCoinbase()) === null) {
        await window.ethereum.enable();
      }

      web4.setProvider(window.ethereum, userAddress);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  } catch (e) {
    console.log('web3Login error: ', e);
    throw new Error(e);
  }
};
