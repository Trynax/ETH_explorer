import { useEffect, useState } from 'react';
import { getETHData } from '../../utils/ethDataFetch.js';

export default function Chart() {
   const [ethData, setEthData] = useState({
      ethPrice: null,  // default to null to handle loading
      marketCap: null,  // default to null
      latestBlock: null, // default to null
   });

   useEffect(() => {
      async function fetchData() {
         try {
            const data = await getETHData();
            setEthData({
               ethPrice: Number(data.ethPrice),  // Ensure it's a number
               marketCap: data.marketCap,
               latestBlock: data.latestBlock
            });
         } catch (err) {
            console.log(err);
         }
      }

      fetchData();
   }, []);

   return (
      <section className='flex gap-6'>
         <div className='flex-1 grid grid-cols-2 gap-3'>
            <div className='bg-customGray py-6 rounded-sm px-4 flex gap-2 items-center'>
               <i className="fa-brands fa-ethereum text-3xl"></i>
               <div className='flex flex-col'>
                  <span className='text-gray-400'>ETH price</span>
                  <span className='text-xl font-bold'>
                     {ethData.ethPrice !== null && !isNaN(ethData.ethPrice) 
                        ? `$${ethData.ethPrice.toFixed(2)}` 
                        : 'Loading...'}
                     <span className='text-red-500 text-sm'>(-20%)</span>
                  </span>
               </div>
            </div>

            <div className='bg-customGray py-6 rounded-sm gap-3 px-4 flex items-center'>
               <div className='p-2 bg-iconBg rounded-full'>
                  <i className="fa-solid fa-arrow-right-arrow-left text-xl text-customColor"></i>
               </div>
               <div className='flex flex-col'>
                  <span className='text-gray-400'>Total Transactions</span>
                  <span className=''>340k</span>
               </div>
            </div>

            <div className='bg-customGray py-6 rounded-sm gap-3 px-4 flex items-center'>
               <div className='p-2 bg-iconBg rounded-full'>
                  <i className="fa-solid fa-globe text-xl text-customColor"></i>
               </div>
               <div className='flex flex-col'>
                  <span className='text-gray-400'>Market Cap</span>
                  <span className='text-xl font-bold'>
                     {ethData.marketCap !== null 
                        ? `$${Math.round(ethData.marketCap).toLocaleString()}` 
                        : 'Loading...'}
                  </span>
               </div>
            </div>

            <div className='bg-customGray py-6 rounded-sm gap-3 px-4 flex items-center'>
               <div className='p-2 bg-iconBg rounded-full'>
                  <i className="fa-solid fa-cube text-xl text-customColor"></i>
               </div>
               <div className='flex flex-col'>
                  <span className='text-gray-400'>Latest Finalized Block</span>
                  <span className='text-xl font-bold'>
                     {ethData.latestBlock !== null 
                        ? `${parseInt(ethData.latestBlock)}` 
                        : 'Loading...'}
                  </span>
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
   );
}
