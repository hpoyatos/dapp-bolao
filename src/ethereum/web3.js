import Web3 from 'web3';
//import {Eth} from 'web3-eth';

let web3js;

//console.log(Web3.givenProvider);
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

/*
window.ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})

window.ethereum.on('networkChanged', function (netId) {
  // Time to reload your interface with netId
})
you can also prevent metamask from automatically reloading web page

window.onbeforeunload = function() {
  return "Prevent reload"
}

else if (typeof Web3.givenProvider !== 'undefined') {
  web3js = new Web3(Web3.givenProvider);
}
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
*/
export default web3js;
