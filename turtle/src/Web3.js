import Web3 from 'web3';
import contractABI from '../solidity/MiseEnRelation.sol'; // Remplacez `contractABI` par le nom du fichier contenant l'ABI de votre contrat

const web3 = new Web3(window.ethereum);

// Adresse du contrat
const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

// Instance du contrat
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;