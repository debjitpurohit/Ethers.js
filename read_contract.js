//***********here transfer.sol is not important but the abi in transfer.json is important    
const { ethers } = require("ethers");
const transfer = require('./transfer.json');/////for abi
//add alchemy
const RPC="https://eth-sepolia.g.alchemy.com/v2/dLTXbEy9ospyla1iEeN22KlgdMJK5TA7";

const provider = new ethers.providers.JsonRpcProvider(RPC);////////you have to downgrade ( npm install ethers@5.7.2 )

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const contractAddress="0xD26dc3Bcf399e1f601Bb0d60A5F9b46b0b42dE25"//contract address
const ABI = transfer.abi; //contract abi from artifacts-->transfers.json in remix ide




//reading contract
async function readContract() {
    const contract=new ethers.Contract(
        contractAddress, //contract address
        ABI, //contract ABI from artifacts-->transfers.json in remix ide
        provider //provider for reading contract
    )

    console.log("owner address:",await contract.callowner()); //callOwner is a function in contract 


}

readContract();


