//SPDX-License-Identifier: Unlicensed
pragma solidity >=0.7.0;

contract transfer{
    address public owner;////jehetu this is public variable so we can call the variable as a function in ether.js
    //////if we run the events in ether.js then we can see to and amount in the args
    
    event transactions(address to,uint amount);//EVENT for ether.js for low gas consumption use for cheching how many times transaction is done
   // event transactions(address indexed to,uint indexed amount); //used for more filtering the events

    constructor(){
        owner=msg.sender;
    }
    //raeding the owner address
    function callowner() public view returns(address){
        return owner;
    }
    //writting 
    function _transfer(address payable _to) public payable {
        _to.transfer(msg.value);
        emit transactions(_to, msg.value);//save to ether.js
    }
}
////////////////////////testing done from remix