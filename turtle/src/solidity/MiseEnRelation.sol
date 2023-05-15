// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionContract {
    struct Transaction {
        address demandeur;
        address accepteur;
        string description;
        uint256 price;
        bool accepted;
        bool completed;
    }

    Transaction[] public transactions;
    uint256 public transactionCount;
    address payable escrow = payable(address(this));

    event TransactionCreated(address indexed demandeur, string description, uint256 price);
    event TransactionAccepted(uint256 indexed id, address indexed accepteur);
    event TransactionCompleted(uint256 indexed id);

    function createTransaction(string memory _description,uint256 price) public payable {
        require(msg.value == price, "Price must be equal to the value sent");
        transactions.push(Transaction(msg.sender, address(0), _description, price, false, false));
        transactionCount++;
        emit TransactionCreated(msg.sender, _description, price);
    }

    function acceptTransaction(uint256 _id) public {
        require(_id < transactionCount, "Invalid transaction ID");
        Transaction storage transaction = transactions[_id];
        require(transaction.accepteur == address(0), "Transaction already accepted");
        transaction.accepteur = msg.sender;
        transaction.accepted = true;
        emit TransactionAccepted(_id, msg.sender);
    }

    function completeTransaction(uint256 _id) public {
        require(_id < transactionCount, "Invalid transaction ID");
        Transaction storage transaction = transactions[_id];
        require(transaction.completed == false, "Transaction already completed");
        require(transaction.demandeur == msg.sender, "Only the demandeur can complete the transaction");
        payable(transaction.accepteur).transfer(transaction.price);
        transaction.completed = true;
        emit TransactionCompleted(_id);
    }
}
