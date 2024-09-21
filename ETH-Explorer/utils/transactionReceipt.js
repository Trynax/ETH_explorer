import { Alchemy, Network } from 'alchemy-sdk';
import { getBlockFirstFourTxn } from './getBlock.js';



const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;


const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getTransctionReceipt(hash) {
    const txnReceipt = await alchemy.core.getTransaction(hash)
    return txnReceipt;
}


async function getLatestFourTransactions() {
    const lastFourTransactions = []
    const txns = await getBlockFirstFourTxn()


    for(let i=0; i<txns.length; i++){
        const txnHash = txns[i]
        const txnReceipt = await getTransctionReceipt(txnHash)
        lastFourTransactions.push(txnReceipt)
    }

    return lastFourTransactions
}


export {
    getLatestFourTransactions
}
