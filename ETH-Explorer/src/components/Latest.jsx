import { useEffect, useState } from "react";
import { getETHData } from "../../utils/ethDataFetch";
import { getLatestFourTransactions } from "../../utils/transactionReceipt";
import { ethers } from 'ethers';
import { getLatestBlock } from "../../utils/getBlock";

export default function Latest() {
    const [ethData, setEthData] = useState({});
    const [latestFourTxn, setLatestFourTxn] = useState([]);
    const [latestBlock, setLatestBlock] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const ethData = await getETHData();
                const latestFourTransactions = await getLatestFourTransactions();
                const block = await getLatestBlock();
                setLatestBlock(block);
                setEthData(ethData);
                setLatestFourTxn(latestFourTransactions);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

        return () => {};
    }, []);

    const lastFourBlocks = [];
    for (let i = latestBlock - 3; i <= latestBlock; i++) {
        lastFourBlocks.push(i);
    }

    return (
        <section className="flex gap-6">
            <div className="flex-1 flex gap-3 flex-col hidden lg:flex">
                <h1 className="text-3xl font-bold">Latest Blocks</h1>
                <div className="flex flex-col gap-2">
                    {lastFourBlocks.map((block, index) => {
                        return (
                            <div key={index} className="flex p-3 bg-white border gap-3 rounded-md items-center">
                                <div className="p-2 bg-iconBg rounded-full">
                                    <i className="fa-solid fa-cube text-xl text-customColor"></i>
                                </div>
                                <div>
                                    <h3 className="text-customColor">{block}</h3>
                                    <p className="text-gray-400">Few secs ago</p>
                                </div>
                                <p className="text-customColor bg-iconBg p-[2px] rounded-md">0.0647ETH</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Latest Transactions */}
            <div className="flex-[5] flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Latest Transactions</h1>
                <table className="min-w-full table-auto bg-white shadow-md rounded-md">
                    <thead className="bg-customGray">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-500">Block</th>
                            <th className="px-4 py-2 text-left text-gray-500">Txn hash</th>
                            <th className="px-4 py-2 text-left text-gray-500">Method</th>
                            <th className="px-4 py-2 text-left text-gray-500">From / To</th>
                            <th className="px-4 py-2 text-left text-gray-500">Amount / Fee</th>
                            <th className="px-4 py-2 text-left text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="border-spacing-3">
                        {latestFourTxn.map((txn, i) => {
                            return (
                                <tr key={i} className="border-b text-customColor">
                                    <td className="px-4 py-2 flex flex-col ">
                                        {txn.blockNumber}
                                        <span className="text-gray-400 text-[10px]">few secs ago</span>
                                    </td>
                                    <td className="px-4 py-2">{formatHash(txn.hash)}</td>
                                    <td className="px-4 py-2">Transfer</td>
                                    <td className="px-4 py-2 flex flex-col items-center">
                                        <span>{shortenAddress(txn.from)}</span>
                                        <i className="fa-solid fa-arrows-up-down"></i>
                                        <span>{shortenAddress(txn.to)}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="p-1 text-sm bg-iconBg rounded-md text-center">
                                            {formatEtherValue(txn.value)} ETH
                                        </span>
                                        <br />
                                        <span className="text-sm text-gray-400 text-center">
                                            Fee: {formatGasFee(txn.gasPrice, txn.gasLimit)} ETH
                                        </span>
                                    </td>
                                    <td className="px-4 py-2"><span className="bg-[#ECFDF3] text-[#027A48] items-center p-2 rounded-md "><i className="fa-solid fa-check mr-1"></i>Success</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

// Utility function to shorten the address
function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Utility function to format Ether value to 4 decimal places
function formatEtherValue(value) {
    return (parseInt(value.toHexString()) / 1e18).toFixed(4);
}

// Utility function to calculate gas fee and format it to 6 decimal places
function formatGasFee(gasPrice, gasLimit) {
    const fee = (parseInt(gasPrice.toHexString()) * parseInt(gasLimit.toHexString())) / 1e18;
    return fee.toFixed(6);
}

function formatHash(hash) {
    return hash.slice(0, 10) + "......"
}