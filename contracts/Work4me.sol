pragma solidity ^0.4.17;

contract Work4me {
    
    address public manager;
    address public client;
    uint public valueTask;
    bool taskOpen;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Work4me() public payable {
        manager = msg.sender;
    }
    
    function openTask() public payable restricted {
        valueTask = msg.value;
    }
    
    function enter() public {
        require(taskOpen == false);
        client = msg.sender;
        taskOpen = true;
    }
    
    function finalizeTask() public restricted {
        require(taskOpen == true);
        client.transfer(valueTask);
        valueTask = 0;
        client = 0x0000000000000000000000000000000000000000;
        taskOpen = false;
    }
}