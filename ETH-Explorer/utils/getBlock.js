import { Alchemy, Network } from 'alchemy-sdk';

const apiKey =import.meta.env.VITE_ALCHEMY_API_KEY;


const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getLatestBlock() {
    const latestBlock = await alchemy.core.getBlockNumber();
  return latestBlock;
}

async function getBlockFirstFourTxn(){
    const blockNumber = await alchemy.core.getBlockNumber()
    const block = await alchemy.core.getBlock(blockNumber, true)

    const firstFourTxn = await block.transactions.slice(0,4)

  return firstFourTxn
 
}


export {getBlockFirstFourTxn, getLatestBlock}