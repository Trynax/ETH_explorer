import onchain from "../assets/on_chain.png"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function Hero() {

  const [searchData, setSearchData] = useState("")
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchData) {
      navigate(`/transaction/${searchData}`);
    }
  }

  return (
    <section className="bg-black relative h-[500px]">
      <img className="absolute top-[30%] left-44" src={onchain} alt="" />
      <img className=" absolute top-[30%] right-44" src={onchain} alt="" /> 
      <div className="absolute top-44 left-[50%] transform -translate-x-1/2 flex flex-col gap-3">
        <h1 className="text-6xl text-center text-white">
          The Ethereum <br/> Blockchain Explorer
        </h1>
        <div className="relative flex w-[700px] bg-white py-4 items-center rounded-lg">
          <i className="fa-solid fa-magnifying-glass text-xl ml-3"></i>
          <input
            onChange={(e) => setSearchData(e.target.value)}
            type="text"
            placeholder="Search by Address / Txn Hash"
            className="w-full ml-4 focus:outline-none text-gray-600"
          />
          <button onClick={handleSearch} className="bg-customColor py-2 px-6 text-white rounded-full mr-4">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
