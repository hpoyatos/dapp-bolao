//import web3 from './web3';
import Web3 from 'web3';
import {Eth} from 'web3-eth';

import ABI from './contracts/build/Bolao.json';

//const fs = require('fs');
//const ADDRESS = fs.readFileSync("ADDRESS").toString().trim();
const ADDRESS = "0xb159Bd43981Be605084523A00F53EBBA6f40EA0A";
/*
const ABI = [{"constant":true,"inputs":[],"name":"getJogadores","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getValorAposta","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumAposta","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"jogadoresInfo","outputs":[{"name":"nome","type":"string"},{"name":"carteira","type":"address"},{"name":"apostas","type":"uint256"},{"name":"isValue","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"escolherGanhador","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_valorAposta","type":"uint256"}],"name":"setValorAposta","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nome","type":"string"}],"name":"entrar","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"address"}],"name":"getJogadorPorId","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getApostas","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGerente","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSaldo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"jogadores","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"carteira","type":"address"},{"indexed":false,"name":"nome","type":"string"},{"indexed":false,"name":"apostas","type":"uint256"},{"indexed":false,"name":"apostasTotal","type":"uint256"},{"indexed":false,"name":"premio","type":"uint256"}],"name":"ApostaEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"carteira","type":"address"},{"indexed":false,"name":"ganhador","type":"string"},{"indexed":false,"name":"premio","type":"uint256"}],"name":"FimDeJogoEvent","type":"event"}];
*/
const eth = new Eth(Web3.givenProvider);
const instance = new eth.Contract(
  ABI,
  ADDRESS
);

export default instance;
