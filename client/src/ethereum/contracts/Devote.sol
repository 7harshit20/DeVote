// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Devote {
    address[] elections;

    function createElection(string[] memory list, string memory title) public {
        Election newElection = new Election(msg.sender, list, title);
        elections.push(address(newElection));
    }

    function getElection() public view returns (address[] memory) {
        return elections;
    }
}

contract Election {
    struct Voter {
        string uniqueId;
        uint256 weight;
        bool voted;
        address vote;
    }
    struct Candidate {
        address uniqueAdd;
        string name;
        string partyName;
        uint256 voteCount;
    }
    address public owner;
    string public title;
    mapping(string => Voter) public voters;
    Candidate[] public candidates;

    modifier onlyManager() {
        require(msg.sender == owner, "Only manager can call this function");
        _;
    }

    constructor(
        address creator,
        string[] memory list,
        string memory _title
    ) {
        owner = creator;
        title = _title;
        for (uint256 i = 0; i < list.length; i++) {
            voters[list[i]] = Voter({
                uniqueId: list[i],
                weight: 1,
                voted: false,
                vote: address(0)
            });
        }
    }

    function nominate(string memory _name, string memory _partyName) public {
        candidates.push(
            Candidate({
                uniqueAdd: msg.sender,
                name: _name,
                partyName: _partyName,
                voteCount: 0
            })
        );
    }

    function vote(string memory idHash, uint256 index) public {
        require(
            voters[idHash].weight == 1,
            "You are not eligible to vote for this election"
        );
        require(!voters[idHash].voted, "Vote already casted");
        require(index < candidates.length, "Invalid candidate");
        candidates[index].voteCount++;
        voters[idHash].voted = true;
        voters[idHash].vote = candidates[index].uniqueAdd;
    }

    function details()
        public
        view
        returns (
            address,
            string memory,
            Candidate[] memory
        )
    {
        return (owner, title, candidates);
    }

    function pickWinner() public view onlyManager returns (string memory) {
        string memory winner;
        uint256 curr = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > curr) {
                winner = candidates[i].name;
                curr = candidates[i].voteCount;
            }
        }
        return winner;
    }
}
