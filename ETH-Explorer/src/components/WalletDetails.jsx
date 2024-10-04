import Header from "./Header";
import { getBlockChainInfo } from "../../utils/getChainData";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletDetails() {
  const [walletDetails, setWalletDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const WalletData = await getBlockChainInfo(
          "0xA15585918e6ef74239246F4E1538ACDf70b4743E"
        );
        // Ensure WalletData.balance is defined before setting state
          setWalletDetails(WalletData)
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setWalletDetails({
          ethBalance: "Error fetching balance",
          transactions: [],
        });
      }
    }
    fetchData();

   
  }, []);

  useEffect(()=>{
    if(walletDetails){
      console.log(walletDetails.balance)
    }
  },[walletDetails])



  return (
    <main className="px-6 pt-3 flex flex-col gap-3">
      <Header />
      <section className="px-20 py-10 bg-[#F7F8FA]">
        <div className="flex flex-col gap-4 items-start mb-4">
          <h1 className="text-3xl font-bold">Wallet Details</h1>
          <p className="px-4 py-3 bg-white rounded-2xl">
            <i className="fa-solid fa-wallet mr-3"></i>
            0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col bg-white p-8 w-[30%] rounded-md">
            <h4 className="text-gray-600">
              <i className="fa-solid fa-wallet text-customColor p-2 bg-iconBg rounded-full"></i>
              Portfolio Value
            </h4>
            <p className="text-xl font-bold ml-6">
              {}
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
            <p className="text-xl font-bold ml-8">400</p>
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
            {walletDetails?.transactions.map((txn, i) => {
                            console.log(txn.value)
                            return (
                                <tr key={i} className="border-b text-customColor">
                                    <td className="px-4 py-2 flex flex-col ">
                                        {txn.blockNumber}
                                        <span className="text-gray-400 text-[10px]">few secs ago</span>
                                    </td>
                                    <td className="px-4 py-2">{formatHash(txn.hash)}</td>
                                    <td className="px-4 py-2">Transfer</td>
                                    <td className="px-4 py-2 flex flex-col items-center">
                                        <span>{shortenAddress(txn.from)}</span>
                                        <i className="fa-solid fa-arrows-up-down"></i>
                                        <span>{shortenAddress(txn.to)}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="p-1 text-sm bg-iconBg rounded-md text-center">
                                            {ethers.formatEther(txn)} ETH
                                        </span>
                                        <br />
                                        <span className="text-sm text-gray-400 text-center">
                                            Fee: {} ETH
                                        </span>
                                    </td>
                                    <td className="px-4 py-2"><span className="bg-[#ECFDF3] text-[#027A48] items-center p-2 rounded-md "><i className="fa-solid fa-check mr-1"></i>Success</span></td>
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
  return ethers.formatEther(value).toFixed(4);
}

// Utility function to calculate gas fee and format it to 6 decimal places
function formatGasFee(gasPrice, gasLimit) {
  const fee = ethers.formatEther(gasPrice)* ethers.formatEther(gasLimit);
  return fee.toFixed(6);
}

function formatHash(hash) {
  return hash.slice(0, 10) + "......"
}