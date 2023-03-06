pragma solidity ^0.8.0;

contract Auction {
    
    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;
    bool public ended;
    address payable public beneficiary;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(address payable _beneficiary) {
        beneficiary = _beneficiary;
    }

    function bid() public payable {
        require(!ended, "Auction has already ended.");
        require(msg.value > highestBid, "There is already a higher bid.");

        if (highestBid != 0) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function endAuction() public {
        require(msg.sender == beneficiary, "You are not authorized to end the auction.");
        require(!ended, "Auction has already ended.");
        
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        
        beneficiary.transfer(highestBid);
    }
}
