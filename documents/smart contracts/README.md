# Smart Contracts Documentation

## Overview
The DappEventX platform uses smart contracts to manage event creation, ticket sales, and revenue distribution on the Avalanche network.

## Contract Architecture
- Main Contract: `DappEventX.sol`
- Inheritance: 
  - `Ownable` - Access control
  - `ReentrancyGuard` - Security against reentrancy attacks
  - `ERC721` - NFT standard for ticket minting

## Contracts

### DappEventX.sol
The main contract handling all platform operations.

#### Purpose
- Manages event creation and modification
- Handles ticket sales and distribution
- Controls revenue sharing and payouts
- Implements NFT minting for tickets

#### State Variables
```solidity
Counters.Counter private _totalEvents;    // Tracks total events created
Counters.Counter private _totalTokens;    // Tracks total NFT tokens minted
uint256 public balance;                   // Contract's current balance
uint256 private servicePct;               // Platform service fee percentage
mapping(uint256 => EventStruct) events;   // Stores event data
mapping(uint256 => TicketStruct[]) tickets; // Stores ticket data
mapping(uint256 => bool) eventExists;     // Tracks existing events
```

#### Core Functions

##### Event Management
```solidity
function createEvent(
    string memory title,
    string memory description,
    string memory imageUrl,
    uint256 capacity,
    uint256 ticketCost,
    uint256 startsAt,
    uint256 endsAt
) public
```
**Purpose**: Creates a new event
**Access**: Public
**Requirements**:
- Ticket cost > 0
- Capacity > 0
- Valid title, description, and imageUrl
- Valid start and end dates

##### Ticket Operations
```solidity
function buyTickets(
    uint256 eventId, 
    uint256 numOfticket
) public payable
```
**Purpose**: Allows users to purchase tickets
**Access**: Public
**Requirements**:
- Event must exist
- 1-3 tickets per transaction
- Sufficient payment
- Available capacity

#### Events Emitted
```solidity
event EventCreated(
    uint256 indexed eventId,
    address indexed owner,
    uint256 timestamp
);

event TicketPurchased(
    uint256 indexed eventId,
    address indexed buyer,
    uint256 quantity,
    uint256 timestamp
);

event EventPaidOut(
    uint256 indexed eventId,
    address indexed owner,
    uint256 amount,
    uint256 timestamp
);
```

#### Access Control
1. **Owner Functions**
   - Contract deployment configuration
   - Service fee management
   - Emergency functions

2. **Event Owner Functions**
   - Event updates
   - Event deletion
   - Payout requests

3. **Public Functions**
   - Event viewing
   - Ticket purchasing
   - Basic queries

#### Security Measures
1. **Reentrancy Protection**
   - ReentrancyGuard for financial transactions
   - Check-Effects-Interaction pattern

2. **Access Controls**
   - Owner and event creator restrictions
   - Function modifiers for authorization

3. **Input Validation**
   - Parameter bounds checking
   - Date validation
   - Payment verification

#### Deployment Instructions

1. **Prerequisites**
```bash
# Environment setup
PRIVATE_KEY=<your-private-key>
NEXT_PUBLIC_RPC_URL=<avalanche-fuji-rpc>
```

2. **Deployment Steps**
```bash
# Compile contracts
yarn hardhat compile

# Deploy to Fuji testnet
yarn hardhat run scripts/deploy.js --network fuji

# Verify contract
yarn hardhat verify --network fuji <contract-address> <service-fee>
```

3. **Post-Deployment**
- Save contract address
- Update frontend configuration
- Verify contract on block explorer