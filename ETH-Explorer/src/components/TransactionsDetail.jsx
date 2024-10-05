import Header from "./Header"
import { getTransactionReceipt } from "../../utils/transactionReceipt"
import { useState,useEffect } from "react"

export default function TransactionDetails() {

  const [transactionReceipt, setTransactionReceipt] = useState({})
  useEffect(()=>{
    async function fetchData(){
      const data = await getTransactionReceipt("0xdb001a5e0e5072d59cc5c4b73912bec78c5c4f50e12923c58b83fe4d8beab4c1")
      setTransactionReceipt(data)
    console.log(data)
    }

    fetchData()

  }, [])
  return (
    <main className="px-6 pt-3 flex flex-col gap-3">
      <Header/>
      <section className="px-20 py-10 bg-[#F7F8FA]">
        <h1 className="text-4xl font-bold mb-3">Transaction Details</h1>
        <div className="p-2 bg-white w-[70%] rounded-full mb-3">
          <p><span className="font-bold mr-2">Txn hash:</span>0xdb001a5e0e5072d59cc5c4b73912bec78c5c4f50e12923c58b83fe4d8beab4c1</p>
        </div>
        <div className="bg-iconBg inline-block p-1 text-customColor font-bold rounded-md mb-6">Overview</div>

        <div className="bg-white  w-[70%] p-4 rounded-md">
          <ul className="flex flex-col gap-6">
            <li className="flex  items-center justify-between w-[100%]"><span>status</span><span className="bg-[#ECFDF3] text-[#027A48] items-center p-1 rounded-md"><i className="fa-solid fa-check mr-1"></i>Success</span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>Block</span><span className="text-customColor">{transactionReceipt?.blockNumber} <span className="bg-[#ECFDF3] text-[#027A48] p-1 rounded-lg">{transactionReceipt?.confirmations} confirmations</span></span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>Time Stamp</span><span>40min ago(sep-09-2024 04:49:23PM UTC)</span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>From</span><span className="text-customColor">{transactionReceipt?.from}</span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>To</span><span className="text-customColor">{transactionReceipt?.to}</span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>Amount</span><span className="">{formatBigNumber(transactionReceipt?.value._hex)}</span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>Transaction Fee</span><span className="">0.00024ETH($0.6)</span></li>
            <li className="flex  items-center justify-between w-[100%]"><span>Gas Price</span><span className="">13.08Gwei(0.000000000000378ETH)</span></li>
          </ul>

        </div>
      </section>
    </main>

  )
}


function formatBigNumber(value){
  return parseFloat(value).toFixed(2)
}