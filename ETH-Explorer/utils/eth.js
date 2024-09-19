async function getETHData (){
    const apiKey = import.meta.env.VITE_APP_API_KEY;

    const ethPriceUrl = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`;
    const latestBlockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${apiKey}`;
    const ethSupplyUrl = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${apiKey}`;

    const responsePrice = await fetch(ethPriceUrl);
    const responseBlock = await fetch(latestBlockUrl);
    const responseSupply = await fetch(ethSupplyUrl);

    const ethPriceData = await responsePrice.json()
    const latestBlockData = await responseBlock.json()
    const ethSupplyData = await responseSupply.json()


    const ethPrice = ethPriceData.result.ethusd
    const ethSupply = ethSupplyData.result
    const marketCap =  ethPrice *(ethSupply/1e18)
    const latestBlock = latestBlockData.result
    console.log(apiKey)

    return {ethPrice,latestBlock,marketCap}

}

export {getETHData}
// const dataResp = await getETHData();


// const ethData = {
//     ethPrice: dataResp.result.ethusd
// }


// console.log(ethData.ethPrice)