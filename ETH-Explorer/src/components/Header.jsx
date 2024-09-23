import Logo from '../assets/Logo.svg';
import { useContext } from 'react';
import { CurrentPage } from '../App';
export default function Header (){
    const [isHome,setIsHome] = useContext(CurrentPage)
    return (
        <header className='flex  justify-between items-center'>
            <div>
                <img src={Logo} alt="" />
            </div>
            <div className=' bg-[#F7F8FA] p-2 rounded-md'>
                <ul className='flex gap-6 text-2xl'>
                    <li className='active-bar'>Home</li>
                    <li>Transactions</li>
                    <li>Blocks</li>
                </ul>
            </div>
            <div className={`w-[30%] relative bg-[#F7F8FA] items-center ${!isHome?'flex':'hidden'}`}>
                            <i className="fa-solid fa-magnifying-glass text-xl ml-3"></i>
                    <input
                        type="text"
                        placeholder={"0x4838B106FCe9647Bdf1E7877BF73cE8"}
                        className="w-full ml-4 focus:outline-none text-gray-600 bg-[#F7F8FA]"
                    />
                            <button className="bg-customColor py-2 px-6 text-white rounded-full mr-4">
                Search
            </button>

            </div>

            <div>
                <button className='px-3 py-4 border border-customColor rounded-2xl text-customColor'>Connect Wallet</button>
            </div>
        </header>
    )
}