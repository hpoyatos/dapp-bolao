import React, { Component } from 'react';
import MenuApp from './components/MenuApp';
import ValorAposta from './components/ValorAposta';

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
      premio: '0'
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
  }

  loadHeader(){
    web3.eth.getAccounts((err, accounts) => {
      bolao.methods.getValorAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({valorAposta: web3.utils.fromWei(result, 'ether')});
        //console.log("primeiro: "+this.state.valorAposta)
      });
/*
      bolao.methods.getNumAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({numApostas: result});
      });

      bolao.methods.getSaldo().call({from: accounts[0]})
      .then((result) => {
        this.setState({premio: result});
      });
*/


    });
  }

  render() {
    return (
      <div className="App">
        <MenuApp />
        <br /><br /><br />
        <Grid columns={4} stackable padded>
        <Grid.Row stretched>
          <Grid.Column>
              <Container>
                <Header as='h3' block>
                  <Icon name='money bill alternate outline' />
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
              <div>{web3.utils.fromWei(this.state.premio, 'ether')}</div>
            </Container>
          </Grid.Column>
          <Grid.Column><ValorAposta gasPrice={this.state.gasPrice} onValorApostaChanged={this.onValorApostaChanged} valorAposta={this.state.valorAposta} /></Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
