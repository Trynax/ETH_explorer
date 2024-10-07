import { useState,useEffect } from 'react'
import { getBlockChainInfo } from '../utils/getChainData'
import { ethers } from 'ethers'
export default function Testing() {

    const [balance, setBalance]= useState(null)

    useEffect(()=>{
      async  function fetchData(){
            const data = await getBlockChainInfo("0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5")
            setBalance(data.balance)
            
        }
        fetchData()

    },[])
  return (
    <div>{balance}</div>
  )
}
