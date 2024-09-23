import { Alchemy, Network } from 'alchemy-sdk';

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
  
  async function getBlockChainInfo (data){
  
    if(data.type === 'Transaction hash'){
      const txn = await alchemy.core.getTransaction(data.value)
      return txn
    }else if (data.type === 'Wallet address'){
      const account = await alchemy.core.getBalance(data.value)
      return account
    } else if (data.type === 'Block number'){
      const block = await alchemy.core.getBlock(data.value,  true)
      return block
    }
    return "Invalid input type"
  
  }
  
  
  
console.log(getBlockChainInfo(getInputType("0x9FB5083bAbE04B3F4FD935C9865a98BB568FCA67")))