import { Alchemy, Network } from 'alchemy-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.VITE_ALCHEMY_API_KEY;


const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getDailyTransactions() {
  let totalTransactions = 0;
  try {
    const latestBlock = await alchemy.core.getBlockNumber();
    const oneDayAgo = latestBlock - 6500;
    
    // Create an array of block numbers to fetch
    const blockNumbers = Array.from({ length: 6501 }, (_, i) => oneDayAgo + i);
    
    // Fetch blocks in parallel
    const blocks = await Promise.all(blockNumbers.map(blockNumber => 
      alchemy.core.getBlock(blockNumber).catch(err => {
        console.error(`Error fetching block ${blockNumber}:`, err);
        return null; // Return null if there's an error fetching the block
      })
    ));

    // Sum up the transactions
    blocks.forEach(block => {
      if (block) {
        totalTransactions += block.transactions.length;
      }
    });

    console.log(`Total transactions in the last 24 hours: ${totalTransactions}`);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

getDailyTransactions();
