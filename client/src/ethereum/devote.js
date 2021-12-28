const web3 = require('./web3')
const Devote = require('./build/Devote.json');

module.exports = new web3.eth.Contract(Devote.abi, '0x9aC60008c47D8bcA497c6a2241990F35e4FF1e0D');

// Rinkeby: 0x3EEDFa0d5850a842F32ECf0c00F124e71C245202
// Mumbai: 0x9aC60008c47D8bcA497c6a2241990F35e4FF1e0D