//***********here transfer.sol is not important but the abi in transfer.json is important    
const { ethers } = require("ethers");
const transfer = require('./transfer.json');/////for abi file
//add alchemy
const RPC="https://eth-sepolia.g.alchemy.com/v2/dLTXbEy9ospyla1iEeN22KlgdMJK5TA7";
const account = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";//have 0 sepoliaeth
const privateKey = "c15c2e91168a0875451aee461027c21b3c03e93dbb2009d737f94cc5342bb871";
//https://ethereum.stackexchange.com/questions/144451/typeerror-cannot-read-properties-of-undefined-reading-jsonrpcprovider
const provider = new ethers.providers.JsonRpcProvider(RPC);////////you have to downgrade ( npm install ethers@5.7.2 )

///check balance of private key
const wallet = new ethers.Wallet(privateKey, provider);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const contractAddress="0xD26dc3Bcf399e1f601Bb0d60A5F9b46b0b42dE25"//contract address
const ABI = transfer.abi; //contract abi from artifacts-->transfers.json in remix ide





async function writecontract() {
    const contract=new ethers.Contract(
        contractAddress, //contract address
        ABI, //contract ABI from artifacts-->transfers.json in remix ide
        wallet //signer for writing contract like metamask
    )
    console.log("balance before transaction")

    console.log(`${account}: ${ethers.utils.formatEther(await provider.getBalance(account))}`);//check balance of account
    console.log(await wallet.getAddress(),":",ethers.utils.formatEther(await wallet.getBalance()));///check balance of private key 


//_transfer function in contract , have to put arguments with the value(object) you want to pay ....here account is the address where we want to send ether
//have to put the value for payable function
    const tx=await contract._transfer(account , { value:ethers.utils.parseEther('0.01')});//0.01 ether converted to wei
    await tx.wait();//wait for transaction to mine
    console.log("balance after transaction")
    console.log(`${account}: ${ethers.utils.formatEther(await provider.getBalance(account))}`);//check balance of account
    console.log(await wallet.getAddress(),":",ethers.utils.formatEther(await wallet.getBalance()));///check balance of private key 

}

writecontract();
