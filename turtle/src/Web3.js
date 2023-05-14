import Web3 from 'web3';
import contractABI from './solidity/MiseEnRelation.sol'; // Remplacez `contractABI` par le nom du fichier contenant l'ABI de votre contrat

const web3 = new Web3(window.ethereum);

// Adresse du contrat
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

// Instance du contrat
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;