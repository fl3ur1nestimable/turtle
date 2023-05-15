// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionContract {
    struct Transaction {
        address demandeur;
        address accepteur;
        string description;
        bool completed;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    event TransactionCreated(uint256 indexed id, address indexed demandeur, string description);
    event TransactionAccepted(uint256 indexed id, address indexed accepteur);
    event TransactionCompleted(uint256 indexed id);

    function createTransaction(string memory _description) public {
        uint256 id = transactionCount;
        transactions[id] = Transaction(msg.sender, address(0), _description, false);
        transactionCount++;

        emit TransactionCreated(id, msg.sender, _description);
    }

    function acceptTransaction(uint256 _id) public {
        require(_id < transactionCount, "Invalid transaction ID");
        Transaction storage transaction = transactions[_id];
        require(transaction.accepteur == address(0), "Transaction already accepted");

        transaction.accepteur = msg.sender;

        emit TransactionAccepted(_id, msg.sender);
    }

    function completeTransaction(uint256 _id) public {
        require(_id < transactionCount, "Invalid transaction ID");
        Transaction storage transaction = transactions[_id];
        require(transaction.completed == false, "Transaction already completed");
        require(transaction.demandeur == msg.sender, "Only the demandeur can complete the transaction");

        transaction.completed = true;

        emit TransactionCompleted(_id);
    }
}
