// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BallotChainV4 {
    struct Election {
        uint256 id;
        string title;
        string[] candidates;
        uint256 startTime;
        uint256 endTime;
        address creator;
        bool active;
        mapping(address => bool) hasVoted;
        mapping(uint256 => uint256) voteCounts;
    }

    uint256 public electionCount;
    mapping(uint256 => Election) public elections;

    event ElectionCreated(uint256 indexed electionId, string title, address creator);
    event VoteCast(uint256 indexed electionId, address indexed voter, uint256 candidateId);
    event ElectionEnded(uint256 indexed electionId, uint256 totalVotes);

    function createElection(
        string memory _title,
        string[] memory _candidates,
        uint256 _startTime,
        uint256 _endTime
    ) external returns (uint256) {
        electionCount++;
        Election storage election = elections[electionCount];
        election.id = electionCount;
        election.title = _title;
        election.candidates = _candidates;
        election.startTime = _startTime;
        election.endTime = _endTime;
        election.creator = msg.sender;
        election.active = true;

        emit ElectionCreated(electionCount, _title, msg.sender);
        return electionCount;
    }

    function castVote(uint256 _electionId, uint256 _candidateId) external {
        Election storage election = elections[_electionId];
        require(election.active, "Election not active");
        require(block.timestamp >= election.startTime, "Not started");
        require(block.timestamp <= election.endTime, "Ended");
        require(!election.hasVoted[msg.sender], "Already voted");
        require(_candidateId < election.candidates.length, "Invalid candidate");

        election.hasVoted[msg.sender] = true;
        election.voteCounts[_candidateId]++;

        emit VoteCast(_electionId, msg.sender, _candidateId);
    }

    function getResults(uint256 _electionId) external view returns (string[] memory, uint256[] memory) {
        Election storage election = elections[_electionId];
        uint256[] memory counts = new uint256[](election.candidates.length);
        for (uint256 i = 0; i < election.candidates.length; i++) {
            counts[i] = election.voteCounts[i];
        }
        return (election.candidates, counts);
    }

    function hasVoted(uint256 _electionId, address _voter) external view returns (bool) {
        return elections[_electionId].hasVoted[_voter];
    }

    function endElection(uint256 _electionId) external {
        Election storage election = elections[_electionId];
        require(msg.sender == election.creator, "Not creator");
        election.active = false;
        uint256 total = 0;
        for (uint256 i = 0; i < election.candidates.length; i++) {
            total += election.voteCounts[i];
        }
        emit ElectionEnded(_electionId, total);
    }
}