const FiapToken = artifacts.require("Bolao");
//const FiapSchool = artifacts.require("FiapSchool");
//const Chamada = artifacts.require("Chamada");

module.exports = function(deployer) {
  deployer.deploy(Bolao);
  //deployer.deploy(FiapSchool, "0xb3e23229fD808a0c6C97944b39480Aa5eB0138af");
  //deployer.deploy(Chamada, "0xb3e23229fD808a0c6C97944b39480Aa5eB0138af");
};
