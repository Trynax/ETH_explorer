import Header from "./Header"
import { getTransactionReceipt } from "../../utils/transactionReceipt"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { getETHData } from "../../utils/ethDataFetch"

export default function TransactionDetails({txnhash}) {

  
  const [transactionReceipt, setTransactionReceipt] = useState({})
  const [ethPrice, setEthPrice] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const ethData = await getETHData()
      const data = await getTransactionReceipt(txnhash) // Use the hash from the URL
      setTransactionReceipt(data)
      setEthPrice(ethData.ethPrice)
    }

    if (txnhash) {
      fetchData()
    }
  }, [txnhash])

  return (
    <main className="px-6 pt-3 flex flex-col gap-3">
      <Header/>
      <section className="px-20 py-10 bg-[#F7F8FA]">
        <h1 className="text-4xl font-bold mb-3">Transaction Details</h1>
        <div className="p-2 bg-white w-[70%] rounded-full mb-3">
          <p><span className="font-bold mr-2">Txn hash:</span>{txnhash}</p>
        </div>
        <div className="bg-iconBg inline-block p-1 text-customColor font-bold rounded-md mb-6">Overview</div>

        <div className="bg-white w-[70%] p-4 rounded-md">
          <ul className="flex flex-col gap-6">
            <li className="flex items-center justify-between w-[100%]"><span>Status</span><span className="bg-[#ECFDF3] text-[#027A48] items-center p-1 rounded-md"><i className="fa-solid fa-check mr-1"></i>Success</span></li>
            <li className="flex items-center justify-between w-[100%]"><span>Block</span><span className="text-customColor">{transactionReceipt?.blockNumber} <span className="bg-[#ECFDF3] text-[#027A48] p-1 rounded-lg">{transactionReceipt?.confirmations} confirmations</span></span></li>
            <li className="flex items-center justify-between w-[100%]"><span>From</span><span className="text-customColor">{transactionReceipt?.from}</span></li>
            <li className="flex items-center justify-between w-[100%]"><span>To</span><span className="text-customColor">{transactionReceipt?.to}</span></li>
            <li className="flex items-center justify-between w-[100%]"><span>Amount</span><span className="">{Number(formatEtherValue(transactionReceipt?.value)).toFixed(4)} (${(formatEtherValue(transactionReceipt?.value) * ethPrice).toFixed(3)})</span></li>
            <li className="flex items-center justify-between w-[100%]"><span>Transaction Fee</span><span className="">{formatGasFee(transactionReceipt?.gasPrice, transactionReceipt?.gasLimit)} (${(formatGasFee(transactionReceipt?.gasPrice, transactionReceipt?.gasLimit) * ethPrice).toFixed(4)})</span></li>
            <li className="flex items-center justify-between w-[100%]"><span>Gas Price</span><span className="">{transactionReceipt.gasPrice && (parseInt(transactionReceipt.gasPrice._hex)/1e9).toFixed(4)} Gwei ({transactionReceipt.gasPrice && (parseInt(transactionReceipt.gasPrice._hex) / 1e18).toFixed(18)} ETH)</span></li>
          </ul>
        </div>
      </section>
    </main>
  )
}

function formatEtherValue(value) {
  if (!value) {
    return "0.00"
  }
  return (parseInt(value.toHexString()) / 1e18).toFixed(4);
}

function formatGasFee(gasPrice, gasLimit) {
  if (!gasPrice || !gasLimit) {
    return "0.00"
  }
  const fee = (parseInt(gasPrice.toHexString()) * parseInt(gasLimit.toHexString())) / 1e18;
  return fee.toFixed(6);
}
