import Header from "./Header";
import { getBlockChainInfo } from "../../utils/getChainData";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getETHData } from "../../utils/ethDataFetch";
import { getWalletTransactionsCount } from "../../utils/totalTransactions";

export default function WalletDetails({ walletAddress }) {
  const [walletDetails, setWalletDetails] = useState(null);
  const [ethPrice, setETHPrice] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getETHData();
        const WalletData = await getBlockChainInfo(walletAddress);
        const transactionsCount = await getWalletTransactionsCount(walletAddress);
        console.log(transactionsCount);
        setWalletDetails(WalletData);
        setETHPrice(data.ethPrice);
        setTransactionsCount(transactionsCount);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setWalletDetails({
          ethBalance: "Error fetching balance",
          transactions: [],
        });
      }
    }
    fetchData();
  }, [walletAddress]);

  return (
    <main className="px-6 pt-3 flex flex-col gap-3">
      <Header />
      <section className="px-20 py-10 bg-[#F7F8FA]">
        <div className="flex flex-col gap-4 items-start mb-4">
          <h1 className="text-3xl font-bold">Wallet Details</h1>
          <p className="px-4 py-3 bg-white rounded-2xl">
            <i className="fa-solid fa-wallet mr-3"></i>
            {walletAddress}
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col bg-white p-8 w-[30%] rounded-md">
            <h4 className="text-gray-600">
              <i className="fa-solid fa-wallet text-customColor p-2 bg-iconBg rounded-full"></i>
              Portfolio Value
            </h4>
            <p className="text-xl font-bold ml-6">
              ${(walletDetails?.balance * ethPrice).toFixed(4)}
            </p>
          </div>
          <div className="flex flex-col bg-white p-8 w-[30%] rounded-md">
            <h4 className="text-gray-600 flex items-center gap-2">
              <i className="fa-brands fa-ethereum text-3xl"></i>ETH Balance
            </h4>
            <p className="text-xl font-bold ml-6">
              {walletDetails?.balance}
            </p>
          </div>
          <div className="flex flex-col bg-white p-8 w-[30%] rounded-md">
            <h4 className="text-gray-600 flex items-center gap-2">
              <i className="fa-solid fa-arrow-right-arrow-left p-2 bg-iconBg rounded-full text-customColor"></i>
              Total Transactions
            </h4>
            <p className="text-xl font-bold ml-8">{transactionsCount}</p>
          </div>
        </div>

        <div className="w-full sm:w-[30%] mb-4">
          <ul className="flex gap-2">
            <li className="text-customColor bg-iconBg p-1 rounded-md">
              Transactions
            </li>
            <li className="text-customColor p-1 rounded-md">ETH Balance</li>
            <li className="text-customColor p-1 rounded-md">Token</li>
            <li className="text-customColor p-1 rounded-md">NFT</li>
          </ul>
        </div>

        <div className="bg-white p-6 ">
          <table className="min-w-full table-auto bg-white shadow-md rounded-md ">
            <thead className="bg-customGray">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Block</th>
                <th className="px-4 py-2 text-left text-gray-500">Txn hash</th>
                <th className="px-4 py-2 text-left text-gray-500">Method</th>
                <th className="px-4 py-2 text-left text-gray-500">From / To</th>
                <th className="px-4 py-2 text-left text-gray-500">
                  Amount / Fee
                </th>
                <th className="px-4 py-2 text-left text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {walletDetails?.transactions?.map((txn, i) => {
                              return (
                  <tr key={i} className="border-b text-customColor">
                    <td className="px-4 py-2 flex flex-col ">
                      {txn?.blockNum ? parseInt(txn.blockNum, 16) : "N/A"}
                      <span className="text-gray-400 text-[10px]">
                        few secs ago
                      </span>
                    </td>
                    <td className="px-4 py-2">{txn?.hash ? formatHash(txn.hash) : "N/A"}</td>
                    <td className="px-4 py-2">Transfer</td>
                    <td className="px-4 py-2 flex flex-col items-center">
                      <span>{txn?.from ? shortenAddress(txn.from) : "N/A"}</span>
                      <i className="fa-solid fa-arrows-up-down"></i>
                      <span>{txn?.to ? shortenAddress(txn.to) : "N/A"}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="p-1 text-sm bg-iconBg rounded-md text-center">
                        {(txn.value).toFixed(3)} {txn.asset}
                      </span>
                      <br />
                      <span className="text-sm text-gray-400 text-center">
                        Fee: {"N/A"} ETH
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-[#ECFDF3] text-[#027A48] items-center p-2 rounded-md ">
                        <i className="fa-solid fa-check mr-1"></i>Success
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Utility function to format Ether value to 4 decimal places
function formatEtherValue(value) {
  if (!value) return "0.0000"; // Return default if value is undefined
  const bigNumberValue = ethers.BigNumber.from(value);
  return ethers.formatEther(bigNumberValue).toFixed(4);
}

// Utility function to calculate gas fee and format it to 6 decimal places
function formatGasFee(gasPrice, gasLimit) {
  if (!gasPrice || !gasLimit) return "N/A"; // Safeguard against undefined values
  const gasPriceBigNumber = ethers.BigNumber.from(gasPrice);
  const gasLimitBigNumber = ethers.BigNumber.from(gasLimit);
  const fee = gasPriceBigNumber.mul(gasLimitBigNumber);
  return ethers.formatEther(fee).toFixed(6);
}

function formatHash(hash) {
  return hash ? hash.slice(0, 10) + "......" : "N/A";
}
