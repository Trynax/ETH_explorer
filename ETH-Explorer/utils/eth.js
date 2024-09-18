import dotenv from 'dotenv';
dotenv.config()


async function getETHData (){
    const resp = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.APIKEY}`)
    const data = resp.json()

    console.log(data)
}


getETHData()