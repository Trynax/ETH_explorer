import { Alchemy, Network } from 'alchemy-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey =process.env.VITE_ALCHEMY_API_KEY;


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
        fromAddress: wallet, 
        category: ['external', 'internal', 'erc20', 'erc721', 'erc1155', 'specialnft'], 
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
  
  async function getBlockChainInfo (data){
  
    if(data.type === 'Transaction hash'){
      const txn = await alchemy.core.getTransaction(data.value)
      return txn
    }else if (data.type === 'Wallet address'){
      const accountBalance = await alchemy.core.getBalance(data.value)
      const transactions = await getWalletTransactions(data.value)
      return {
        accountBalance,
        transactions
      }
    } else if (data.type === 'Block number'){
      const block = await alchemy.core.getBlock(data.value,  true)
      return block
    }
    return "Invalid input type"
  
  }

async function call(){
  console.log(await getBlockChainInfo(getInputType("0x4061a433e3c29c47f038199e780403d04ffd53d5e140bc74e360c5782a3eed91")))
}





call()