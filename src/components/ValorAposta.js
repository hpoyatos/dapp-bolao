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
//import web3js from '../ethereum/web3';
//import Web3 from 'web3';
//import {Eth} from 'web3-eth';

class ValorAposta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorAposta: this.props.valorAposta,
      gasPrice: this.props.gasPrice,
      gerente: false,
      loading: false,
      web3: this.props.web3
    };
  }

  componentWillReceiveProps(props) {
    this.setState({valorAposta: props.valorAposta});
  }

  componentDidUpdate(prevProps, prevState) {

  }

  async componentDidMount() {
    //const eth = new Eth(Web3.givenProvider);

    this.state.web3.eth.getAccounts((err, accounts) => {
      /*bolao.methods.getValorAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({valorAposta: web3js.utils.fromWei(result, 'ether')});
      });*/

      bolao.methods.getGerente().call({from: accounts[0]})
      .then((result) => {
        if (accounts[0] === result){
          this.setState({gerente: true});
        }
      });
    });

    /*this.setState({valorAposta: this.props.valorAposta,
    gasPrice: this.props.gasPrice});*/
  }

  //componentDidCatch(error, info) {
  //}

  onValorApostaChanged = e => {
    this.setState({valorAposta: e.target.value});
  }

  onSubmitValorAposta = async event => {
    event.preventDefault();

    var that = this;
    this.state.web3.eth.getAccounts((err, accounts) => {
      this.setState({loading: true});
      bolao.methods.setValorAposta(this.state.web3.utils.toWei(that.state.valorAposta, 'ether')).send({
        from: accounts[0],
        gasPrice: that.state.gasPrice })
      .once('transactionHash', function(hash){ console.log("1: "+hash); })
      .once('confirmation', function(confNumber, receipt){
        that.setState({loading: false});
        that.props.onValorApostaChanged();
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
    if (this.state.loading) {
      return (<Button primary loading onClick ={this.onSubmitValorAposta}> Atualizar</Button>);
    }
    else {
      return (<Button primary onClick ={this.onSubmitValorAposta}> Atualizar</Button>);
    }
  }

  render() {
    if (this.state.valorAposta !== 0) {
      return (<Container>
        <Header as='h3' block>
          <Icon name='money bill alternate outline' />
          <Header.Content>Valor da Aposta</Header.Content>
        </Header>

          {this.state.gerente ?
            (<Grid columns='equal' stackable padded>
              <Grid.Column>
              <Input
                label='ETH'
                labelPosition='right'
                defaultValue={this.state.valorAposta}
                onChange={this.onValorApostaChanged} />
            </Grid.Column>
            <Grid.Column>{this.button()}</Grid.Column>
            </Grid>
          ) : ( <div>{this.state.valorAposta} ETH</div>)}
       </Container>);
    } else {
      return (<Container></Container>);
    }

  }
}
export default ValorAposta;
