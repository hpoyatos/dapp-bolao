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
import web3js from '../ethereum/web3';
import Web3 from 'web3';
import {Eth} from 'web3-eth';

class Ganhador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasPrice: this.props.gasPrice,
      ganhador: this.props.ganhador,
      gerente: false,
      loading: false,
      fimDeJogo: false
    };
  }

  async componentDidMount() {
    const eth = new Eth(Web3.givenProvider);

    eth.getAccounts((err, accounts) => {
      bolao.methods.getGerente().call({from: accounts[0]})
      .then((result) => {
        if (accounts[0] === result){
          this.setState({gerente: true});
        }
      });
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ganhador: this.props.ganhador});
  }

  onSubmitGanhador = async event => {
    event.preventDefault();
    var that = this;
    const eth = new Eth(Web3.givenProvider);
    eth.getAccounts((err, accounts) => {
      this.setState({loading: true});
      bolao.methods.escolherGanhador().send({
        from: accounts[0],
        gasPrice: that.state.gasPrice })
      .once('transactionHash', function(hash){ console.log("1: "+hash); })
      .once('confirmation', function(confNumber, receipt){
        //console.log("vencedor");
        that.setState({loading: false});
      })
      .on('error', function(error){
        that.setState({loading: false});
      });

    });
  }

  button() {
    //console.log(this.state.ganhador);
    if (this.state.ganhador !== '') {
      return (<div>{this.state.ganhador}</div>);
    }
    else {
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
