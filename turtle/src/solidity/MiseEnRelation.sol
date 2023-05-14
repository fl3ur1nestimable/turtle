//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiseEnRelation {
    struct Transaction {
        address demandeur;
        address accepteur;
        string description;
        bool valide;
    }
    
    Transaction[] public transactions;
    
    function creeTransaction(address _demandeur,string memory _description) public{
        //create a transaction with no accepteur
        Transaction memory transaction = Transaction(_demandeur, address(0), _description, false);
        transactions.push(transaction);
    }

    function accepteTransaction(uint _index) public{
        //accept a transaction
        transactions[_index].accepteur = msg.sender;
        transactions[_index].valide = true;
    }

    function getTransactions() public view returns(Transaction[] memory){
        //return all transactions
        return transactions;
    }

    function getCount() public view returns(uint){
        //return the number of transactions
        return transactions.length;
    }
}
