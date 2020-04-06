const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
 const provider = ganache.provider();
const web3 = new Web3(provider);
 
const { interface, bytecode } = require('../compile');
 
let accounts;
let work4me;
 
beforeEach(async () => {
  
  accounts = await web3.eth.getAccounts();

  work4me = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000',  value: web3.utils.toWei('10', 'ether') });
    
  work4me.setProvider(provider);
});
 
describe('Work4me Contract', () => {
  it('deploys a task', () => {
    assert.ok(work4me.options.address);
  });

  it('Allows one account to enter', async () =>{
    await work4me.methods.enter().send({
      from: accounts[1]
    });

    const users = await work4me.methods.getClients().call({
        from: accounts[0]
    });
    assert.equal(accounts[1], users[0]);
  });

  it('Only manage can call finalizeTask', async() =>{
    try{
      await work4me.methods.finalizeTask().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('Send money to the user and end the task', async() => {
    await work4me.methods.enter().send({
      from: accounts[1]
    });

    const initialValue = await web3.eth.getBalance(accounts[1]);
    //console.log(web3.utils.fromWei(initialValue, 'ether'));

    await work4me.methods.finalizeTask().send({from : accounts[0] });
    
    const finalValue = await web3.eth.getBalance(accounts[1]);
    //console.log(web3.utils.fromWei(finalValue, 'ether'));
    
    const difference = finalValue - initialValue;
    assert(difference > web3.utils.toWei('9', 'ether'));

  });
});