const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'early permit lab door favorite decorate winter black novel drastic sphere bus',
    'https://rinkeby.infura.io/v3/639d5751cb5b484da643e8de299b68b6'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('adress', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x' + bytecode })
     .send({from: accounts[0], value: web3.utils.toWei('5', 'ether') }); 

    console.log(interface);
    console.log('deploy to', result.options.address);
};

deploy();