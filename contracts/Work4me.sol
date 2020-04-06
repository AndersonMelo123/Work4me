pragma solidity ^0.4.17;

contract Work4me {
    
    address public manager;
    address[] public client;
    uint public valueTask;
    bool taskOpen;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Work4me() public payable {
        manager = msg.sender;
        valueTask = msg.value;
    }
    
    function enter() public {
        require(taskOpen == false);
        client.push(msg.sender);
        taskOpen = true;
    }
    
    function finalizeTask() public restricted {
        require(taskOpen == true);
        client[0].transfer(this.balance);
        taskOpen = false;
    }

    function getClients() public view returns (address[]){
        return client;
    }
}