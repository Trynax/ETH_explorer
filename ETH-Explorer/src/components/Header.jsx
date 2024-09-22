import Logo from '../assets/Logo.svg';

export default function Header (){

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
            <div className="relative hidden w-[700px] bg-white py-4 items-center rounded-lg">
    <i className="fa-solid fa-magnifying-glass text-xl ml-3"></i>
    <input
        type="text"
        placeholder="Search by Address / Txn Hash / Block / Domain Name"
        className="w-full ml-4 focus:outline-none text-gray-600"
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