const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const devotePath = path.resolve(__dirname, 'contracts', 'Devote.sol');
const source = fs.readFileSync(devotePath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Devote.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Devote.sol'];

fs.ensureDirSync(buildPath);

for (let contract in compiled) {
    fs.outputJSONSync(path.resolve(buildPath, contract + '.json'),
        compiled[contract]
    );
}

