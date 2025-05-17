// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Proposal {
        string name;
        uint256 votecount;
    }

    struct Election {
        string name;
        string description;
        Proposal[] proposals;
    }

    Election[] public elections;

    mapping(address => mapping(uint256 => bool)) public hasVoted;

    event VoteCast(
        address indexed voter,
        uint256 electionId,
        uint256 proposalId
    );

    constructor() {
        // Create a new election
        Election memory election = Election({
            name: "Election 1",
            description: "First election",
            proposals: new Proposal[](3)
        });

        // Add proposals to the election
        election.proposals[0] = Proposal({name: "Proposal 1", votecount: 0});
        election.proposals[1] = Proposal({name: "Proposal 2", votecount: 0});
        election.proposals[2] = Proposal({name: "Proposal 3", votecount: 0});

        // Add the election to elections array
        elections.push(election);
    }

    function vote(uint256 electionId, uint256 proposalId) external {
        require(electionId < elections.length, "Invalid election ID");
        require(
            proposalId < elections[electionId].proposals.length,
            "Invalid proposal ID"
        );
        require(
            !hasVoted[msg.sender][electionId],
            "You have already voted in this election"
        );

        elections[electionId].proposals[proposalId].votecount += 1;
        hasVoted[msg.sender][electionId] = true;

        emit VoteCast(msg.sender, electionId, proposalId);
    }

    function getProposals(
        uint256 electionId
    ) public view returns (Proposal[] memory) {
        require(electionId < elections.length, "Invalid election ID");
        return elections[electionId].proposals;
    }

    function getElections() public view returns (Election[] memory) {
        return elections;
    }
}
