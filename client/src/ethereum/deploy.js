const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Devote = require('./build/Devote.json');

const path = require('path');
const configPath = path.resolve(__dirname, '../../../', 'config')
process.env["NODE_CONFIG_DIR"] = configPath;
const config = require("config");

let provider;
try {
    provider = new HDWalletProvider(config.get('mnemonic'), config.get('infura_endpoint'));
} catch (error) {
    console.log(error);
    process.exit(1);
}

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const devoteContract = await new web3.eth.Contract(Devote.abi)
        .deploy({ data: Devote.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    console.log('Contract deployed to', devoteContract.options.address);
    provider.engine.stop();
}
deploy();