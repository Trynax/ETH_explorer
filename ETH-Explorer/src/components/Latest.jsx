import { useEffect,useState} from "react"
import { getETHData } from "../../utils/ethDataFetch"

export default function Latest() {
    const [ethData, setEthData] = useState({})
    useEffect(()=>{
        async function fetchData() {
            try{
                const ethData = await getETHData()
                setEthData(ethData)
            }catch(err){
                console.log(err)
            }
        }
        fetchData() 
        return () => {
       
        }
    },[])

    const lastFourBlocks =[]
    for(let i=ethData.latestBlock-4; i<=ethData.latestBlock; i++){
        lastFourBlocks.push(i)
    }
  return (
    <section className="flex gap-6">
        <div className="flex-1">
            <h1 className="text-3xl font-bold">Latest Blocks</h1>
            <div className="flex flex-col gap-2">
                {lastFourBlocks.map((block)=>{
                    return <div className="flex p-3 bg-white border gap-3 rounded-md items-center">
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

        <div className="flex-[5]" >
            <h1 className="text-3xl font-bold">Latest Transactions</h1>

        </div>
    </section>   
  )
}
