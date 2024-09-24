import Header from "./Header"
export default function WalletDetails() {
  return (
    <main className="px-6 pt-3 flex flex-col gap-3">
      <Header />
      <section className="px-20 py-10 bg-[#F7F8FA]">
       <div className="flex flex-col gap-4 items-start mb-4">
       <h1 className="text-3xl font-bold">Wallet Details</h1>
       <p className="px-4 py-3 bg-white rounded-2xl"><i className="fa-solid fa-wallet mr-3"></i>0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97</p>
       </div>
       <div className="flex justify-between mb-4">
         <div className="flex flex-col bg-white p-8 w-[30%] rounded-md" >
           <h4 className="text-gray-600"><i class="fa-solid fa-wallet text-customColor p-2 bg-iconBg rounded-full"></i>Porfolio Value</h4>
           <p className="text-xl font-bold ml-6">$1,000</p>
         </div>
         <div className="flex flex-col bg-white p-8  w-[30%] rounded-md" >
           <h4 className="text-gray-600 flex items-center gap-2"><i className="fa-brands fa-ethereum text-3xl"></i>ETH Balance</h4>
           <p className="text-xl font-bold ml-6">0.045ETH</p>
         </div>
         <div className="flex flex-col bg-white p-8  w-[30%] rounded-md" >
           <h4 className="text-gray-600 flex items-center gap-2"> <i className="fa-solid fa-arrow-right-arrow-left p-2 bg-iconBg rounded-full text-customColor"></i>Total Transactions</h4>
           <p className="text-xl font-bold ml-8">400</p>
         </div>
       </div>

       <div className="w-full sm:w-[30%]">
        <ul className="flex gap-2">
          <li className="text-customColor bg-iconBg p-1 rounded-md">Transactions</li>
          <li className="text-customColor  p-1 rounded-md">ETH Balance</li>
          <li className="text-customColor  p-1 rounded-md">Token</li>
          <li className="text-customColor  p-1 rounded-md">NFT</li>
        </ul>
       </div>
      </section>
    </main>
  )
}
