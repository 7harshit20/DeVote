const assert = require('assert');
const ganche = require('ganache-cli');
const { beforeEach } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganche.provider());

const Devote = require('../ethereum/build/Devote.json');
const Election = require('../ethereum/build/Election.json');

let accounts, devote, election;

beforeEach('Deploying contact', async () => {
    accounts = await web3.eth.getAccounts();

    devote = await new web3.eth.Contract(Devote.abi)
        .deploy({ data: Devote.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    await devote.methods.createElection(["1", "2", "3"], "test election").send({ from: accounts[1], gas: '1500000' });
    [electionAdd] = await devote.methods.getElection().call();

    election = await new web3.eth.Contract(Election.abi, electionAdd);
})

describe('Devote Contract', () => {
    it('deploys the election contract', () => {
        assert.ok(devote.options.address);
        assert.ok(election.options.address);
    });

    it('candidates can nominate themselves', async () => {
        await election.methods.nominate('Candidate 1', 'A').send({ from: accounts[2], gas: '1000000' });
        const candidate = await election.methods.candidates(0).call();
        assert.equal(candidate.name, 'Candidate 1');
        assert.equal(candidate.partyName, 'A');
    });

    it('non eligible voters cannot vote', async () => {
        let occured = true;
        try {
            await election.methods.nominate('Candidate 1', 'A').send({ from: accounts[2], gas: '1000000' });
            await election.methods.vote('4', '0').send({ from: accounts[3] })
        } catch (error) {
            occured = false;
        }
        assert(!occured);
    });

    it('eligible candidate can vote', async () => {
        await election.methods.nominate('Candidate 1', 'A').send({ from: accounts[2], gas: '1000000' });
        await election.methods.vote('1', '0').send({ from: accounts[3] });
        const voter = await election.methods.voters('1').call();
        assert(voter.voted);
        assert.equal(voter.vote, accounts[2]);
    });

    it('can fetch details of election', async () => {
        await election.methods.nominate('Candidate 1', 'A').send({ from: accounts[2], gas: '1000000' });
        const detail = await election.methods.details().call();
        assert.equal(detail[0], accounts[1]);
        assert.equal(detail[1], 'test election');
        assert.equal(detail[2][0].uniqueAdd, accounts[2]);
    })
});