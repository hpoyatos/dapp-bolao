import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Input,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import bolao from '../ethereum/Contrato';
import web3 from '../ethereum/web3';

class ValorAposta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorAposta: this.props.valorAposta,
      gasPrice: this.props.gasPrice,
      loading: false
    }
  }

  async componentDidMount() {
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
    web3.eth.getAccounts((err, accounts) => {
      this.setState({loading: true});
      bolao.methods.setValorAposta(that.state.valorAposta).send({
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

  render() {

    return (<Container>
      <Header as='h3' block>
        <Icon name='money bill alternate outline' />
        <Header.Content>Valor da Aposta</Header.Content>
      </Header>

      <Grid columns='equal' stackable padded>
        <Grid.Column><Input
        label='ETH'
        labelPosition='right'
        defaultValue={this.state.valorAposta}
        onChange={this.onValorApostaChanged} />
        </Grid.Column>
        <Grid.Column>
        {this.state.loading ?
          (<Button primary loading onClick = {this.onSubmitValorAposta}> Atualizar</Button>)
          :
          (<Button primary onClick = {this.onSubmitValorAposta}> Atualizar</Button>)
        }
        </Grid.Column>
      </Grid>
     </Container>);
  }
}
export default ValorAposta;
