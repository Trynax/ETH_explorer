import { Alchemy, Network } from 'alchemy-sdk';

const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;


const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);


async function  getWalletTransactionsCount(wallet) {
  try{
    const data = await alchemy.core.getTransactionCount(wallet)
    return data
  }catch(error){
    return 0;
  }

}

export{getWalletTransactionsCount}