import React, { Component } from 'react';
import ValorAposta from './components/ValorAposta';
import Apostar from './components/Apostar';
import Ganhador from './components/Ganhador';

import {
  Grid,
  Container,
  Header,
  Icon,
  Table,
  Image
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import walletImage from './images/wallet.svg';
import './App.css';

import bolao from './ethereum/Contrato';
import Web3 from 'web3';
//import {Eth} from 'web3-eth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorAposta: '0',
      gasPrice: 100000000000,
      numApostas: '0',
      premio: '0',
      blockNumber: 0,
      ganhador: null,
      jogadores: [],
      //eth: new Eth(Web3.givenProvider),
      web3: new Web3(Web3.givenProvider)
    }

    this.onValorApostaChanged = this.onValorApostaChanged.bind(this);
    //console.log(this.state.web3);

    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.enable();
    }
  }

  onValorApostaChanged() {
    this.loadHeader();
  }

  async componentDidMount() {
    this.loadHeader();

    bolao.events.ApostaEvent({ // Using an array means OR: e.g. 20 or 23
        fromBlock: this.state.web3.eth.defaultBlock
    }, (error, event) => { //console.log(event);
    })
    .on('data', (event) => {
        this.setState({premio: event.returnValues.premio, numApostas: event.returnValues.apostasTotal});

        var aJogs = this.state.jogadores;

        var novo = true;
        for (var i=0; i<aJogs.length; i++)
        {
          /*console.log(event.returnValues);
          console.log(aJogs[i].carteira);
          console.log(event.returnValues.carteira);*/
          if(aJogs[i].carteira === event.returnValues.carteira)
          {
            novo = false;
            aJogs[i].apostas = event.returnValues.apostas;
          }
        }

        if (novo) {
          aJogs.push({nome: event.returnValues.nome, carteira: event.returnValues.carteira, apostas: event.returnValues.apostas});
          this.setState({jogadores: aJogs});
        }

    })
    .on('changed', (event) => {
        // remove event from local database
    })
    .on('error', console.error);

    bolao.events.FimDeJogoEvent({
        fromBlock: this.state.web3.eth.defaultBlock
    }, (error, event) => {
    })
    .on('data', (event) => {
      console.log(event.returnValues);
        this.setState({ganhador: event.returnValues.ganhador});
    });

    this.state.web3.eth.getAccounts((err, accounts) => {
      bolao.methods.getJogadores().call({from: accounts[0]})
      .then((_jogadores) => {
        for(var i in _jogadores) {
          var aJogs=[];
          bolao.methods.jogadoresInfo(_jogadores[i]).call({from: accounts[0]})
          .then((_jogador) => {
            aJogs = this.state.jogadores;
            aJogs.push({nome: _jogador[0], carteira: _jogador[1], apostas: _jogador[2]});
            this.setState({jogadores: aJogs});
          });
        }
      });
    });

    //Metamask
    if (typeof window.ethereum !== 'undefined') {
      //console.log(window.ethereum.selectedAddress);
      //console.log(window.ethereum.networkVersion);
      var that = this;
      window.ethereum.on('accountsChanged', function (accounts) {
        that.render();
      })

      window.ethereum.on('networkChanged', function (netId) {
        that.render();
      })
    }
  }

  loadHeader(){
    this.state.web3.eth.getAccounts((err, accounts) => {
      bolao.methods.getValorAposta().call({from: accounts[0]})
      .then((result) => {
        this.setState({valorAposta: this.state.web3.utils.fromWei(result, 'ether')});
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

  renderJogadores(){
    /*if (this.state.jogadores.length > 0)
    {*/
      var tablerows = [];

      var jogs = this.state.jogadores;

      for(var i=0; i<jogs.length; i++){
        tablerows.push(<Table.Row key={jogs[i].carteira}>
          <Table.Cell>
            <Image src={walletImage} size='mini' verticalAlign='middle' alt={jogs[i].carteira} title={jogs[i].carteira} />
            <span>{jogs[i].nome}</span>
          </Table.Cell>
          <Table.Cell textAlign='center'>{jogs[i].apostas}</Table.Cell>
        </Table.Row>);
      }

      return (<Container>
        <Header as='h3' block>
          <Icon name='trophy' />
          <Header.Content>Jogadores</Header.Content>
        </Header>
        <Table sortable celled fixed>
          <Table.Header>
          <Table.Row key='cabecalho'>
              <Table.HeaderCell>Nome do Jogador</Table.HeaderCell>
              <Table.HeaderCell textAlign='center' sorted='descending'>Número de Apostas</Table.HeaderCell>
            </Table.Row>
          </Table.Header><Table.Body>{tablerows}</Table.Body>
        </Table>
        </Container>);
    /*}
    else {
      return(<Container></Container>);
    }*/
  }

  render() {
    if (this.state.valorAposta !== 0)  {
      return (
        <div className="App">
          <Grid columns='equal' stackable padded>
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
            <Grid.Column key='apostas'>
              <Container>
                <Header as='h3' block>
                  <Icon name='money' />
                  <Header.Content>Apostas</Header.Content>
                </Header>
                <div>{this.state.numApostas}</div>
              </Container>
            </Grid.Column>
            <Grid.Column key='premio'>
              <Container>
                <Header as='h3' block>
                  <Icon name='gift' />
                  <Header.Content>Prêmio</Header.Content>
                </Header>
                <div>{this.state.web3.utils.fromWei(this.state.premio, 'ether')} ETH</div>
              </Container>
            </Grid.Column>
            <Grid.Column key='ganhador'><Ganhador web3={this.state.web3} ganhador={this.state.ganhador} gasPrice={this.state.gasPrice} /></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column key='apostar'><Apostar web3={this.state.web3} gasPrice={this.state.gasPrice} /></Grid.Column>
            <Grid.Column key='valorAposta'><ValorAposta web3={this.state.web3} valorAposta={this.state.valorAposta} gasPrice={this.state.gasPrice} onValorApostaChanged={this.onValorApostaChanged} /></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column key='jogadores'>{this.renderJogadores()}</Grid.Column>
          </Grid.Row>
          </Grid>
        </div>
      );
    } else {
      return (<div className="App"></div>);
    }
  }
}

export default App;
