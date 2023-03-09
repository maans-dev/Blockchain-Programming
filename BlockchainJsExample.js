//Requirements
//========================================================
var Web3 = require('web3'); //npm i web3
const bip39 = require('bip39'); //npm i bip39
const ethers = require('ethers'); //npm i ethers

//Create a web3 object for a specific blockchain - Provider URL = Chain specific
const web3 = new Web3(Web3.givenProvider || "https://polygon-mainnet.infura.io/v3/deb27c2ab5ec495cb518843db8cd425d");

//Get Crypto Balance example
//========================================================
var address = "0xFDD928e780C844C61699a68623f4c43DAdbbB081";
web3.eth.getBalance(address).then(balanceCallback); //This is async due to blockchain call

function balanceCallback(balanceString){
  //balanceString has balance as a BIG INT in wei, convert from wei and log as human readable number
  console.log("User Balance: "+web3.utils.fromWei( balanceString, 'ether'));
}

//Create Wallet example
//========================================================
//Step 1 generate seed phrase
var mnemonic = bip39.generateMnemonic(); //Can feed in entropy as a param if desired
console.log("Seed Phrase: "+mnemonic);
//Step 2 create a wallet from seed phrase (Must be consistent methodology)
let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic,"m"); //"m" is the derivation path, THIS MUST BE "m"
var userWallet = web3.eth.accounts.privateKeyToAccount(mnemonicWallet.privateKey);
console.log(userWallet); //This is the user wallet, with private key, in JSON format
console.log("User Address: "+userWallet.address); //Use this to extract address specifically

//Send Crypto example
//========================================================
//Address used for example 0xc57287c3F0b6dE1d4a4961D2FEdDEA248367aB87
//Address crypto is sent to 0xFDD928e780C844C61699a68623f4c43DAdbbB081

//Compatibility test - Using an existing wallet
let mnemonicWalletTest = ethers.Wallet.fromMnemonic("desert save denial envelope neglect humble debate spring moon tunnel erode faculty","m"); //"m" is the derivation path, THIS MUST BE "m"
const testWallet = web3.eth.accounts.privateKeyToAccount(mnemonicWalletTest.privateKey); //We will use this wallet in the send example
console.log(testWallet); //This is the user wallet, with private key, in JSON format
console.log("User Address: "+testWallet.address); //Desired output: 0xc57287c3F0b6dE1d4a4961D2FEdDEA248367aB87

//Converting between Wei and Eth - Transactions require all amounts to be in Wei
console.log("Test Amount: "+web3.utils.fromWei( "1000000000000000", 'ether')); //This is 0.001
var weiValue = web3.utils.toWei('0.001', 'ether');
console.log("Wei Value: "+weiValue);

const addressTo = '0xFDD928e780C844C61699a68623f4c43DAdbbB081'; //Address we are sending to
// 3. Create send function
const send = async () => {
  console.log(`Attempting to send transaction from ${testWallet.address} to ${addressTo}`);

  // 4. Sign tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction({
      gas: 21000, //Basic Send transactions use 21 000 gas, gas is how much computational power is required by Tx
      to: addressTo,
      value: web3.utils.toWei('0.001', 'ether'),
    },
    testWallet.privateKey
  );

  // 5. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
};

// 6. Call send function
send();
