import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Input,
  Button,
  Icon
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import bolao from '../ethereum/Contrato';
import web3 from '../ethereum/web3';

class Apostar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasPrice: this.props.gasPrice,
      jaApostou: false,
      loading: false,
      nome: '',
      liberado: false
    };
  }

  async componentDidMount() {
    web3.eth.getAccounts((err, accounts) => {
      if (accounts[0] !== undefined)
      {
        this.setState({liberado: true});
      }

      bolao.methods.getJogadorPorId(accounts[0]).call({from: accounts[0]})
      .then((result) => {
        if (accounts[0] === result[1]){
          this.setState({jaApostou: true, nome: result[0]});
        }
      });

      bolao.methods.getValorAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({valorAposta: result});
      });
    });

    /*this.setState({valorAposta: this.props.valorAposta,
    gasPrice: this.props.gasPrice});*/
  }

  //componentDidCatch(error, info) {
  //}

  onNomeChanged = e => {
    this.setState({nome: e.target.value});
  }

  onSubmitAposta = async event => {
    event.preventDefault();
    var that = this;
    web3.eth.getAccounts((err, accounts) => {
      this.setState({loading: true});
      bolao.methods.entrar(that.state.nome).send({
        from: accounts[0],
        value: that.state.valorAposta,
        gasPrice: that.state.gasPrice })
      .once('transactionHash', function(hash){ console.log("1: "+hash); })
      .once('confirmation', function(confNumber, receipt){
        that.setState({loading: false, jaApostou: true});
        //that.props.onApostaChanged();
      })
      //.once('receipt', function(receipt){  })
      .on('error', function(error){
        that.setState({loading: false});
      });
      /*.then(function(receipt){
        this.setState({loading: false});
      });*/

    });
  }

  button() {
    if (this.state.liberado)
    {
      if (this.state.loading) {
        return (<Button primary loading onClick = {this.onSubmitAposta}> Apostar</Button>);
      }
      else {
        return (<Button primary onClick = {this.onSubmitAposta}> Apostar</Button>);
      }
    }
    else {
      return (<Button disabled> Sem carteira</Button>);
    }

  }

  render() {
    return (<Container>
      <Header as='h3' block>
        <Icon name='dollar sign' />
        <Header.Content>Faça sua aposta!</Header.Content>
      </Header>

        {!this.state.jaApostou ?
          (<Grid columns='equal' stackable padded>
            <Grid.Column>
            <Input
              onChange={this.onNomeChanged} />
          </Grid.Column>
          <Grid.Column>{this.button()}</Grid.Column>
          </Grid>
        ) : ( <Grid columns='equal' stackable padded><Grid.Column>{this.state.nome}</Grid.Column><Grid.Column>{this.button()}</Grid.Column></Grid>)}
     </Container>);
  }
}
export default Apostar;
