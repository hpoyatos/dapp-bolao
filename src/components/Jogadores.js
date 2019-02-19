import React, { Component } from 'react';
import {
  Container,
  Header,
  Table,
  Icon
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
//import _ from 'lodash';

import Jogador from './Jogador';

import bolao from '../ethereum/Contrato';
import web3 from '../ethereum/web3';

class Jogadores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((err, accounts) => {
      bolao.methods.getJogadores().call({from: accounts[0]})
      .then((_jogadores) => {
        this.setState({jogadores: _jogadores});
      });
    });
  }

  render() {
    if (this.state.jogadores !== undefined)
    {
      var jogadores = (this.state.jogadores);

      var rows = [];
            for(var i in jogadores) {
                rows.push(<Jogador key={jogadores[i]} carteira={jogadores[i]}/>);
            }
      return (<Container>
        <Header as='h3' block>
          <Icon name='trophy' />
          <Header.Content>Jogadores</Header.Content>
        </Header>
        <Table sortable celled fixed>
          <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Nome do Jogador</Table.HeaderCell>
              <Table.HeaderCell textAlign='center' sorted='descending'>Número de Apostas</Table.HeaderCell>
            </Table.Row>
          </Table.Header><Table.Body>{rows}</Table.Body>
        </Table>
        </Container>);
    }
    else {
      return(<Container></Container>);
    }
  }
}
export default Jogadores;
