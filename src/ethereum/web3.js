import Web3 from 'web3';
//import {Eth} from 'web3-eth';

let web3js;

// Modern dapp browsers...
if (typeof window.ethereum !== 'undefined') {
  try {
  // Request account access if needed
    web3js = new Web3(window.ethereum);
    window.ethereum.enable()
    .then( (addresses) => {
      });
  } catch (error) {
    //dispatch(setMetamaskState (MetamaskStatus.USER_DENIED_ACCESS))
  }
}
<<<<<<< HEAD
//New
else if (typeof Web3.givenProvider !== 'undefined') {
  web3js = new Web3(Web3.givenProvider);
}
=======
>>>>>>> 3d216437a5468532fc54eb1e8d5dc8b4167c66b3
// Legacy dapp browsers...
else if (window.web3) {
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running.
    web3js = new Web3(window.web3.currentProvider);
  } else {
    // We are on the server *OR* the user is not running metamask.
    const  provider = new Web3.providers.HttpProvider(
      'https://ropsten.infura.io/ZwevbRaJDOz0oPl0jWOQ'
    );
    web3js = new Web3(provider);
  }
}

export default web3js;
