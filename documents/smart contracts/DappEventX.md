# DappEventX Smart Contract Documentation

## Contract Overview
The DappEventX contract manages event creation, ticket sales, and payouts on the blockchain.

## Core Features
1. Event Management
2. Ticket Sales
3. Revenue Distribution
4. NFT Minting

## Contract Methods

### Event Management
\`\`\`solidity
function createEvent(
    string memory title,
    string memory description,
    string memory imageUrl,
    uint256 capacity,
    uint256 ticketCost,
    uint256 startsAt,
    uint256 endsAt
) public
\`\`\`

### Ticket Operations
\`\`\`solidity
function buyTickets(uint256 eventId, uint256 numOfticket) public payable
function payout(uint256 eventId) public
\`\`\`

## Data Structures

### Event Struct
\`\`\`solidity
struct EventStruct {
    uint256 id;
    string title;
    string imageUrl;
    string description;
    address owner;
    uint256 sales;
    uint256 ticketCost;
    uint256 capacity;
    uint256 seats;
    uint256 startsAt;
    uint256 endsAt;
    uint256 timestamp;
    bool deleted;
    bool paidOut;
    bool refunded;
    bool minted;
}
\`\`\`