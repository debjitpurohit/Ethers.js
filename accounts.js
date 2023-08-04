const { ConstructorFragment } = require("@ethersproject/abi");
const { ethers } = require("ethers");
//add alchemy
const RPC="https://eth-sepolia.g.alchemy.com/v2/dLTXbEy9ospyla1iEeN22KlgdMJK5TA7";
const account1 = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";//have 0 sepoliaeth
const privateKey = "c15c2e91168a0875451aee461027c21b3c03e93dbb2009d737f94cc5342bb871";
//https://ethereum.stackexchange.com/questions/144451/typeerror-cannot-read-properties-of-undefined-reading-jsonrpcprovider
const provider = new ethers.providers.JsonRpcProvider(RPC);////////you have to downgrade ( npm install ethers@5.7.2 )

///check balance of private key
const wallet = new ethers.Wallet(privateKey, provider);

//check balance of account1
async function balance() {
    //convert wei to ether formatEther and ether to wei parseEther
  const balance = await provider.getBalance(account1);//balance in wei
    console.log(account1 , ":",ethers.utils.formatEther(balance));//convert to ether and check balance of account1
    console.log(await wallet.getAddress(),":",ethers.utils.formatEther(await wallet.getBalance()));///check balance of private key 

}
balance();










//send ether from wallet to account1

async function sendEther() {
    const trans = await wallet.sendTransaction({
        to: account1,
        value: ethers.utils.parseEther("0.000000001")
    });
    await trans.wait();// joto khon na TRANSACTION MINE HOBE and balance update hbe TOTO KHON WAIT KORBE
    console.log("Transaction successfully deposited to account1");
    console.log("Balance of account1 after transaction");
    const balance2 = await provider.getBalance(account1);
    console.log(account1 , ":",ethers.utils.formatEther(balance2));
    console.log("Balance of wallet after transaction");
    console.log(await wallet.getAddress(),":",ethers.utils.formatEther(await wallet.getBalance()));
    console.log(trans);



}
sendEther();