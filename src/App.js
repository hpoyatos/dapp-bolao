import React, { Component } from 'react';
import MenuApp from './components/MenuApp';
import ValorAposta from './components/ValorAposta';
import Apostar from './components/Apostar';
import Ganhador from './components/Ganhador';
import Jogadores from './components/Jogadores';

import {
  Grid,
  Container,
  Header,
  Icon
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

//import logo from './logo.svg';
import './App.css';

import bolao from './ethereum/Contrato';
import web3 from './ethereum/web3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorAposta: '0',
      gasPrice: 100000000000,
      numApostas: '0',
      premio: '0',
      blockNumber: 0
    }

    this.onValorApostaChanged = this.onValorApostaChanged.bind(this);
  }

  onValorApostaChanged() {
    /*this.setState({
      valorAposta: pValorAposta
    })*/
    //console.log(this.state.valorAposta);
    //console.log("voltou");
    this.loadHeader();
  }

  async componentDidMount() {
    this.loadHeader();

    bolao.events.ApostaEvent({ // Using an array means OR: e.g. 20 or 23
        fromBlock: web3.eth.defaultBlock
    }, (error, event) => { //console.log(event);
    })
    .on('data', (event) => {
        console.log(event.returnValues); // same results as the optional callback above
        this.setState({premio: event.returnValues.premio, numApostas: event.returnValues.apostasTotal});
    })
    .on('changed', (event) => {
        // remove event from local database
    })
    .on('error', console.error);
  }

  loadHeader(){
    web3.eth.getAccounts((err, accounts) => {
      bolao.methods.getValorAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({valorAposta: web3.utils.fromWei(result, 'ether')});
        //console.log("primeiro: "+this.state.valorAposta)
      });

      bolao.methods.getNumAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({numApostas: result});
      });

      bolao.methods.getSaldo().call({from: accounts[0]})
      .then((result) => {
        this.setState({premio: result});
      });

    });
  }

  render() {
    return (
      <div className="App">
        <MenuApp />
        <br /><br /><br />
        <Grid columns={2} stackable padded>
        <Grid.Row stretched>
          <Grid.Column>
              <Container>
                <Header as='h3' block>
                  <Icon name='file alternate' />
                  <Header.Content>Número do Contrato (Ropsten)</Header.Content>
                </Header>
                <div>{bolao.options.address}</div>
              </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Header as='h3' block>
                <Icon name='money' />
                <Header.Content>Apostas</Header.Content>
              </Header>
              <div>{this.state.numApostas}</div>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Header as='h3' block>
                <Icon name='gift' />
                <Header.Content>Prêmio</Header.Content>
              </Header>
              <div>{web3.utils.fromWei(this.state.premio, 'ether')} ETH</div>
            </Container>
          </Grid.Column>
          <Grid.Column><ValorAposta gasPrice={this.state.gasPrice} onValorApostaChanged={this.onValorApostaChanged} /></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><Apostar gasPrice={this.state.gasPrice} /></Grid.Column>
          <Grid.Column><Ganhador gasPrice={this.state.gasPrice} /></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><Jogadores /></Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
