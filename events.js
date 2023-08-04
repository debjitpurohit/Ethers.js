//transactions events means how many times transfer function is called or how many times transaction is done

//***********here transfer.sol is not important but the abi in transfer.json is important    
const { ethers } = require("ethers");
const transfer = require('./transfer.json');/////for abi
//add alchemy
const RPC="https://eth-sepolia.g.alchemy.com/v2/dLTXbEy9ospyla1iEeN22KlgdMJK5TA7";

const provider = new ethers.providers.JsonRpcProvider(RPC);////////you have to downgrade ( npm install ethers@5.7.2 )

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const contractAddress="0xD26dc3Bcf399e1f601Bb0d60A5F9b46b0b42dE25"//contract address
const ABI = transfer.abi; //contract abi from artifacts-->transfers.json in remix ide




//reading events in contract
async function readevent() {
    const contract=new ethers.Contract(
        contractAddress, //contract address
        ABI, //contract ABI from artifacts-->transfers.json in remix ide
        provider //provider for reading contract
    )

    // const block=await provider.getBlockNumber();//get block number

    const transaction=await contract.queryFilter("transactions");//transactions is the event name in contract and block-20 is the starting block and block is the ending block
    // const transaction=await contract.queryFilter("transactions",block-20,block);//transactions is the event name in contract and block-20 is the starting block and block is the ending block
    
    
    //for indexed to and amount in transfer.sol
    //const trans=contract.filters.transactions("adress",ethers.utils.parseEther("1"));
    // const transaction=await contract.queryFilter(trans)
    
    //the output of transaction is an array of objects
    transaction.map((item)=>{
    console.log(item.args.to,":",ethers.utils.formatEther(item.args.amount));//to and amount are present in args and amount is comming in wei
});//print all the arguments in event transaction

    // console.log(transaction);//print all transactions in contract





}

readevent();