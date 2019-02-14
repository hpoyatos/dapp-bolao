import web3 from './web3';
import Bolao from './build/Bolao.json';

const file = require("ADDRESS");
const ADDRESS = this.readTextFile(file);

const instance = new web3.eth.Contract(
  JSON.parse(Bolao.interface),
  ADDRESS
);

export default instance;
