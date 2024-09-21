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

            <div>
                <button className='px-3 py-4 border border-customColor rounded-full  text-customColor'>Connect Wallet</button>
            </div>
        </header>
    )
}