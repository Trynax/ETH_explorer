import { useEffect,useState} from "react"
import { getETHData } from "../../utils/ethDataFetch"
import { getLatestFourTransactions} from "../../utils/transactionReceipt"
import {ethers} from 'ethers'
import { getLatestBlock } from "../../utils/getBlock"

export default function Latest() {
    const [ethData, setEthData] = useState({})
    const [latestFourTxn, setLatestFourTxn]=useState([])
    const [latestBlock, setLatestBlock] = useState()
    useEffect(()=>{
        async function fetchData() {
            try{
                const ethData = await getETHData()
                const latestFourTransactions = await getLatestFourTransactions()
                const block = await getLatestBlock()
                setLatestBlock(block)
                setEthData(ethData)
                setLatestFourTxn(latestFourTransactions)
            }catch(err){
                console.log(err)
            }
        }
       
        fetchData() 

        return () => {
       
        }
    },[])

    const lastFourBlocks =[]
    for(let i=latestBlock-3; i<=latestBlock; i++){
        lastFourBlocks.push(i)
    }
  return (
    <section className="flex gap-6">
        <div className="flex-1 flex gap-3 flex-col">
            <h1 className="text-3xl font-bold">Latest Blocks</h1>
            <div className="flex flex-col gap-2">
                {lastFourBlocks.map((block, index)=>{
                    return <div key={index}  className="flex p-3 bg-white border gap-3 rounded-md items-center">
                                    <div className='p-2 bg-iconBg rounded-full'>
                            <i className="fa-solid fa-cube text-xl text-customColor"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-customColor">{block}</h3>
                                        <p className="text-gray-400">Few secs ago</p>
                                    </div>
                                    <p className="text-customColor bg-iconBg p-[2px] rounded-md">0.0647ETH</p>
                         </div>
                })}
            </div>
        </div>

        <div className="flex-[5] flex flex-col gap-3" >
            <h1 className="text-3xl font-bold">Latest Transactions</h1>
            <table className="min-w-full table-auto bg-white shadow-md rounded-md">
               <thead className="bg-customGray">
               <tr>
               <th className="px-4 py-2 text-left text-gray-500">Block</th>
               <th className="px-4 py-2 text-left text-gray-500">Txn hash</th>
               <th className="px-4 py-2 text-left text-gray-500">Method</th>
               <th className="px-4 py-2 text-left text-gray-500">From / To</th>
               <th className="px-4 py-2 text-left text-gray-500">Amount / fee</th>
               <th className="px-4 py-2 text-left text-gray-500">Status</th>
               </tr>
                </thead>
                <tbody className="border-spacing-3">
                    {latestFourTxn.map((txn,i)=>{

                        console.log(ethers.utils.formatEther(tx.value))
                        return <tr key={i} className="border-b text-customColor" >
                            <td className="px-4 py-2 flex flex-col">{txn.blockNumber}<span className="text-gray-400 text-[10px]">few secs ago</span></td>
                            <td className="px-4 py-2">{txn.hash}</td>
                            <td className="px-4 py-2">Transfer</td>
                            <td className="px-4 py-2 flex flex-col items-center"><span>{txn.from}</span><i className="fa-solid fa-arrows-up-down"></i><span>{txn.to}</span></td>
                            <td className="px-4 py-2">
                                   
                            </td>

                            <td className="px-4 py-2">{txn.block}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </section>   
  )
}
