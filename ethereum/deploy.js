const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env.local') });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');

provider = new HDWalletProvider( process.env.METAMASK_MNEMONIC, process.env.INFURA_RINKEBY_URL );
const web3 = new Web3(provider);

const deploy = async() => {

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting deployment from account: ', accounts[0]);

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    console.log('Initial balance: ', initialBalance);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                        .deploy({
                            data: compiledFactory.bytecode,
                            arguments: ['Hi there']
                        })
                        .send({
                            from: accounts[0],
                            gas: '1000000'
                        });
    console.log('Deployed contract address: ', result.options.address);

    const finalBalance = await web3.eth.getBalance(accounts[0]);
    console.log('Final Balance: ', finalBalance);

    provider.engine.stop();
};

deploy();