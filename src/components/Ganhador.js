import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Button,
  Icon
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import bolao from '../ethereum/Contrato';
import web3 from '../ethereum/web3';

class Ganhador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasPrice: this.props.gasPrice,
      gerente: false,
      ganhador: '',
      loading: false,
      fimDeJogo: false
    };
  }

  async componentDidMount() {
    web3.eth.getAccounts((err, accounts) => {
      bolao.methods.getGerente().call({from: accounts[0]})
      .then((result) => {
        if (accounts[0] === result){
          this.setState({gerente: true});
        }
      });
    });
  }

  onSubmitGanhador = async event => {
    event.preventDefault();
    var that = this;
    web3.eth.getAccounts((err, accounts) => {
      this.setState({loading: true});
      bolao.methods.escolherGanhador().send({
        from: accounts[0],
        gasPrice: that.state.gasPrice })
      .once('transactionHash', function(hash){ console.log("1: "+hash); })
      .once('confirmation', function(confNumber, receipt){
        console.log("vencedor");
      })
      .on('error', function(error){
        that.setState({loading: false});
      });

    });
  }

  button() {
    if (this.state.gerente) {
      if (this.state.loading) {
        return (<Button primary loading onClick = {this.onSubmitGanhador}> Escolher ganhador</Button>);
      }
      else {
        if (!this.state.fimDeJogo)
        {
          return (<Button primary onClick = {this.onSubmitGanhador}> Escolher ganhador</Button>);
        }
        else {
          return("<div>Fim de Jogo!</div>");
        }
      }
    }
  }

  render() {
    return (<Container>
      <Header as='h3' block>
        <Icon name='trophy' />
        <Header.Content>Ganhador</Header.Content>
      </Header>
          <Grid columns='equal' stackable padded>
            <Grid.Column>{this.button()}</Grid.Column>
          </Grid>
        </Container>);
  }
}
export default Ganhador;
