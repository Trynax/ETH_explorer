import React from 'react'
export default function Chart() {
  return (
     <section className='flex gap-6'>
        <div className='flex-1 grid grid-cols-2 gap-3 '>
                 <div className='bg-customGray py-6 rounded-sm px-4 flex gap-2 items-center '>
                 <i className="fa-brands fa-ethereum text-3xl"></i>
                 <div className='flex flex-col'>
                    <span className='text-gray-400'>ETH price</span>
                    <span className='text-xl font-bold'>$2450 <span className='text-red-500 text-sm'>(-20%)</span></span>
                 </div>
                 </div>
                 <div className='bg-customGray py-6 rounded-sm gap-3 px-4 flex items-center '>
                 <div className='p-2 bg-iconBg rounded-full '>
                 <i className="fa-solid fa-arrow-right-arrow-left text-xl text-customColor"></i>
                 </div>
                 <div className='flex flex-col'>
                    <span className='text-gray-400'>Total Transactions</span>
                    <span className=''>340k</span>
                 </div>
                 </div>
                 <div className='bg-customGray py-6 rounded-sm gap-3 px-4 flex items-center '>
                 <div className='p-2 bg-iconBg rounded-full '>
                 <i className="fa-solid fa-globe text-xl text-customColor"></i>
                 </div>
                 <div className='flex flex-col'>
                    <span className='text-gray-400'>Market Cap</span>
                    <span className='text-xl font-bold'>$300,000,000,000</span>
                 </div>
                 </div>
                 <div className='bg-customGray py-6 rounded-sm gap-3 px-4 flex items-center '>
                 <div className='p-2 bg-iconBg rounded-full '>
                 <i className="fa-solid fa-cube text-xl text-customColor"></i>
                 </div>
                 <div className='flex flex-col'>
                    <span className='text-gray-400'>Latest Finalized Block</span>
                    <span className='text-xl font-bold'>2627396</span>
                 </div>
                 </div>
        </div>
        <div className='flex-[2] bg-customGray p-4'>
             <div className='flex'>
               <div className='p-2 rounded-full bg-iconBg'>
               <i className="fa-solid fa-arrow-right-arrow-left text-xl text-customColor"></i>
               </div>
               <div className='flex flex-col'>
               <span className='text-gray-400'>Total Transactions</span>
               <span className=''>340k</span>
               </div>
             </div>
        </div>
     </section>
  )
}
