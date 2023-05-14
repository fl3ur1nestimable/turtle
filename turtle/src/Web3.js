import Web3 from 'web3';
import data from './data.json';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");;
// Adresse du contrat
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
//ABI du contrat
const contractABI = data;
// Instance du contrat
const contract = new web3.eth.Contract(contractABI, contractAddress);
// set provider for all later instances to use
contract.setProvider(web3.currentProvider);


export default contract;