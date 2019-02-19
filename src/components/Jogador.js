import React, { Component } from 'react';
import {
  Table,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import bolao from '../ethereum/Contrato';
import web3 from '../ethereum/web3';

class Jogador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      carteira: this.props.carteira,
      aposta: null
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((err, accounts) => {
      bolao.methods.jogadoresInfo(this.state.carteira).call({from: accounts[0]})
      .then((_jogador) => {
        this.setState({nome: _jogador[0], apostas: _jogador[2]});
      });
    });
  }

  render() {
    if (this.state.nome !== null)
    {
      return (<Table.Row key={this.state.carteira}>
                <Table.Cell>{this.state.nome}</Table.Cell>
                <Table.Cell textAlign='center'>{this.state.apostas}</Table.Cell>
              </Table.Row>);
    }
    else {
      return("");
    }
  }
}
export default Jogador;
