pragma solidity ^0.8.0;

contract MiseEnRelation {
    struct Transaction {
        address acheteur;
        address vendeur;
        string description;
        bool valide;
    }
    
    Transaction[] public transactions;
    
    event NouvelleTransaction(uint transactionId, address acheteur, address vendeur, string description);
    event TransactionValidee(uint transactionId);
    
    function creerTransaction(address _vendeur, string memory _description) public {
        uint transactionId = transactions.length;
        transactions.push(Transaction(msg.sender, _vendeur, _description, false));
        
        emit NouvelleTransaction(transactionId, msg.sender, _vendeur, _description);
    }
    
    function validerTransaction(uint _transactionId) public {
        require(_transactionId < transactions.length, "Transaction non valide");
        require(msg.sender == transactions[_transactionId].acheteur, "Vous n'etes pas autorise a valider cette transaction");
        require(!transactions[_transactionId].valide, "La transaction a deja ete validee");
        
        transactions[_transactionId].valide = true;
        
        emit TransactionValidee(_transactionId);
    }
    
    function getNombreTransactions() public view returns(uint) {
        return transactions.length;
    }
    
    function getTransaction(uint _transactionId) public view returns(address, address, string memory, bool) {
        require(_transactionId < transactions.length, "Transaction non valide");
        
        Transaction memory transaction = transactions[_transactionId];
        return (transaction.acheteur, transaction.vendeur, transaction.description, transaction.valide);
    }
}
