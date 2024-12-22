// SPDX-License-Identifier: MIT 

pragma solidity >=0.7.0 <0.9.0; //compiler

import '@openzeppelin/contracts/access/Ownable.sol'; //managing the owners
import '@openzeppelin/contracts/utils/Counters.sol'; //keeps tracks of numbers
import '@openzeppelin/contracts/token/ERC721/ERC721.sol'; //for giving tokens or nft
import '@openzeppelin/contracts/security/ReentrancyGuard.sol'; //double execution of insideous actions

contract EventX is Ownable, ReentrancyGuard, ERC721 {
    using Counters for Counters.Counter; 
    Counters.Counter private _totalEvents; //keeps track of the total #of events
    Counters.Counter private _totalTokens; //keeps track of the #of nfts handed out

    //event struct
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
        uint startsAt;
        uint256 endsAt;
        uint256 timestamp;
        bool deleted;
        bool paidOut;
        bool refunded;
        bool minted;
    }

    struct TicketStruct {
        uint256 id;
        uint256 eventId;
        address owner;
        uint256 ticketCost;
        uint256 timestamp;
        bool refunded;
        bool minted;
    
    }

    uint256 public balance; //shows the balance on the platform
    uint256 private servicePct; //the percentage of the platform fee

    mapping(uint256 => EventStruct) events; 
    mapping(uint256 => TicketStruct[]) tickets;
    mapping(uint256 => bool) eventExists;

    constructor(uint256 _pct) ERC721("Event X", "ETX") {
        servicePct = _pct;
    }

    //create an event
    function createEvent(
        string memory title,
        string memory description,
        string memory imageUrl,
        uint256 capacity,
        uint256 ticketCost,
        uint256 startsAt,
        uint256 endsAt
    ) public {
        require(ticketCost > 0 ether, "Ticket cost must be greater than 0");
        require(capacity > 0, "Capacity must be greater than 0");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageUrl).length > 0, "Image URL cannot be empty");
        require(startsAt > 0, "Start date must be greater than 0");
        require(endsAt > startsAt, "End date must be greater than start date");

        _totalEvents.increment();
        EventStruct memory eventX;

        eventX.id = _totalEvents.current();
        eventX.title = title;
        eventX.description = description;
        eventX.imageUrl = imageUrl;
        eventX.capacity = capacity;
        eventX.ticketCost = ticketCost;
        eventX.startsAt = startsAt;
        eventX.endsAt = endsAt;
        eventX.owner = msg.sender;
        eventX.timestamp = currentTime();

        eventExists[eventX.id] = true;
        events[eventX.id] = eventX;
    }

    // update event
    function updateEvent(
            uint256 eventId,
            string memory title,
            string memory description,
            string memory imageUrl,
            uint256 capacity,
            uint256 ticketCost,
            uint256 startsAt,
            uint256 endsAt
    ) public {
        require(eventExists[eventId], "Event does not exist");
        require(events[eventId].owner == msg.sender, "Unauthorized entity");
        require(ticketCost > 0 ether, "Ticket cost must be greater than 0");
        require(capacity > 0, "Capacity must be greater than 0");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageUrl).length > 0, "Image URL cannot be empty");
        require(startsAt > 0, "Start date must be greater than 0");
        require(endsAt > startsAt, "End date must be greater than start date");

       
        EventStruct memory eventX = events[eventId];
        eventX.title = title;
        eventX.description = description;
        eventX.imageUrl = imageUrl;
        eventX.capacity = capacity;
        eventX.ticketCost = ticketCost;
        eventX.startsAt = startsAt;
        eventX.endsAt = endsAt;
        events[eventX.id] = eventX;
    }

    // delete event
    function deleteEvent(
            uint256 eventId
    ) public {
        require(eventExists[eventId], "Event does not exist");
        require(events[eventId].owner == msg.sender || msg.sender == owner(), "Unauthorized entity");
        require(!events[eventId].paidOut, "Event have already been paid out");
        require(!events[eventId].refunded, "Event already refunded");
        
        // perform refund...
        events[eventId].deleted = true;
    }
    

    function getEvents() public view returns (EventStruct[] memory Events) {
        uint256 available;
        for (uint256 i = 0; i <= _totalEvents.current(); i++) {
            if(!events[1].deleted && events[i].owner == msg.sender) available++;
        }

        Events = new EventStruct[](available);
        uint256 index;
        for (uint256 i = 0; i <= _totalEvents.current(); i++) {
            if(!events[1].deleted && events[i].owner == msg.sender) {
                Events[index++] = events[i];
            }
        }
        
    }

    function getMyEvents() public view returns (EventStruct[] memory Events) {
        uint256 available;
        for (uint256 i = 0; i <= _totalEvents.current(); i++) {
            if(!events[1].deleted) available++;
        }

        Events = new EventStruct[](available);
        uint256 index;
        for (uint256 i = 0; i <= _totalEvents.current(); i++) {
            if(!events[1].deleted) {
                Events[index++] = events[i];
            }
        }
        
    }

    function getSingleEvent(uint256 eventId) public view returns (EventStruct memory) {
        return events[eventId];    
    }

    function buyTickets(uint256 eventId, uint256 numOfticket) public payable {
        require(eventExists[eventId], "Event does not exist");
        require(numOfticket > 0 && numOfticket <= 3, 'Number of tickets must be between 1 - 3');
        require(msg.value >= numOfticket * events[eventId].ticketCost, 'Insufficient funds');
        require(events[eventId].seats + numOfticket <= events[eventId].capacity, 'Not enough seats available');

        for (uint i = 0; i < numOfticket; i++) {
            TicketStruct memory ticket;
            ticket.id = tickets[eventId].length;
            ticket.eventId = eventId;
            ticket.owner = msg.sender;
            ticket.ticketCost = events[eventId].ticketCost;
            ticket.timestamp = currentTime();
            tickets[eventId].push(ticket);
        }

        events[eventId].seats += numOfticket;
        balance += msg.value;
    }

    function getTickets(uint256 eventId) public view returns (TicketStruct[] memory) {
        return tickets[eventId];    
    }

    function refundTickets(uint256 eventId) internal returns (bool) {
        for (uint i = 0; i < tickets[eventId].length; i++) {
            tickets[eventId][i].refunded = true;
            balance -= tickets[eventId][i].ticketCost;
            payTo(tickets[eventId][i].owner, tickets[eventId][i].ticketCost);
            
        }

        events[eventId].refunded = true;
        return true;
    }

    function currentTime() internal view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}('');
        require(success);
    }

}



