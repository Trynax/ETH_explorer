import { Alchemy, Network } from 'alchemy-sdk';
import dotenv from 'dotenv';
import { ethers } from 'ethers';

const apiKey =import.meta.env.VITE_ALCHEMY_API_KEY;


const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function getInputType(input){
    if (typeof input === 'string' && input.startsWith('0x')){
      if (input.length === 66){
        return { type: 'Transaction hash', value:input}
      }else if (input.length ===42){
        return { type: 'Wallet address', value:input}
      }
    } else if (typeof input === 'number' || !isNaN(parseInt(input))){
      return { type: 'Block number', value: input}
    } else{
      return "Invalid input"
    }
  }

  async function getWalletTransactions(wallet) {
    try {
      const transactions = await alchemy.core.getAssetTransfers({
        fromAddress:wallet,
        category:['external', 'internal', 'erc20', 'erc721', 'erc1155', 'specialnft'], 
        maxCount: 3, 
        withMetadata: true, 
        order: 'desc',  
      });
  
      return transactions.transfers; // Access the transfers array
    } catch (e) {
      console.error('Error fetching transactions:', e);
      return "Error fetching transactions";
    }
  }
  
  async function getBlockChainInfo (value){
    const data = getInputType(value)
    if(data.type === 'Transaction hash'){
      const txn = await alchemy.core.getTransaction(data.value)
      return txn
    }else if (data.type === 'Wallet address'){
      const ethBalance = await alchemy.core.getBalance(data.value)
      const transactions = await getWalletTransactions(data.value)
      const balance = ethers.formatEther(ethBalance._hex)
      return {
        balance,
        transactions
      }
    } else if (data.type === 'Block number'){
      const block = await alchemy.core.getBlock(data.value,  true)
      return block
    }
    return "Invalid input type"
  
  }



  async function getTransactionReceipt(hash) {
    const data = await alchemy.core.getTransactionByHash(hash)

    return data
  }

  export {getBlockChainInfo,getTransactionReceipt}