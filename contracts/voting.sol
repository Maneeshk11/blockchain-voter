// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Proposal {
        uint256 id;
        string name;
        uint256 votecount;
    }

    struct Election {
        uint256 id;
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

    event ElectionCreated(uint256 id, string name, string description);

    constructor() {
        // Create a new election
        Election memory election = Election({
            id: 0,
            name: "Election 1",
            description: "First election",
            proposals: new Proposal[](0)
        });

        // Add the election to elections array
        elections.push(election);

        // Add proposals to the election
        createProposal(0, "Proposal 1");
        createProposal(0, "Proposal 2");
        createProposal(0, "Proposal 3");
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

    function getElections()
        public
        view
        returns (
            uint256[] memory ids,
            string[] memory names,
            string[] memory descriptions,
            uint256[] memory proposalCounts
        )
    {
        uint256 length = elections.length;

        ids = new uint256[](length);
        names = new string[](length);
        descriptions = new string[](length);
        proposalCounts = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            ids[i] = elections[i].id;
            names[i] = elections[i].name;
            descriptions[i] = elections[i].description;
            proposalCounts[i] = elections[i].proposals.length;
        }

        return (ids, names, descriptions, proposalCounts);
    }

    function hasAlreadyVoted(uint256 electionId) public view returns (bool) {
        require(electionId < elections.length, "Invalid election ID");
        return hasVoted[msg.sender][electionId];
    }

    function getElection(
        uint256 electionId
    )
        public
        view
        returns (
            uint256 id,
            string memory name,
            string memory description,
            Proposal[] memory proposals,
            bool voted
        )
    {
        require(electionId < elections.length, "Invalid election ID");
        Election storage election = elections[electionId];
        return (
            election.id,
            election.name,
            election.description,
            election.proposals,
            hasVoted[msg.sender][electionId]
        );
    }

    function createElection(
        string memory name,
        string memory description,
        string[] memory proposalNames
    ) public {
        uint256 newElectionId = elections.length;
        Election memory election = Election({
            id: newElectionId,
            name: name,
            description: description,
            proposals: new Proposal[](0)
        });

        elections.push(election);

        for (uint256 i = 0; i < proposalNames.length; i++) {
            createProposal(newElectionId, proposalNames[i]);
        }

        emit ElectionCreated(newElectionId, name, description);
    }

    function createProposal(uint256 electionId, string memory name) public {
        elections[electionId].proposals.push(
            Proposal({
                id: elections[electionId].proposals.length,
                name: name,
                votecount: 0
            })
        );
    }

    function getProposalsByElectionId(
        uint256 electionId
    )
        public
        view
        returns (
            uint256[] memory ids,
            string[] memory names,
            uint256[] memory votecounts
        )
    {
        require(electionId < elections.length, "Invalid election ID");
        Proposal[] storage proposals = elections[electionId].proposals;
        uint256 length = proposals.length;

        ids = new uint256[](length);
        names = new string[](length);
        votecounts = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            ids[i] = proposals[i].id;
            names[i] = proposals[i].name;
            votecounts[i] = proposals[i].votecount;
        }

        return (ids, names, votecounts);
    }
}
