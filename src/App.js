import React, { Component } from 'react';
import MenuApp from './components/MenuApp';
import ValorAposta from './components/ValorAposta';

import {
  Grid
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

//import logo from './logo.svg';
import './App.css';

import web3 from './ethereum/web3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorAposta: 0,
      gasPrice: 100000000000
    }

    this.onValorApostaChanged = this.onValorApostaChanged.bind(this)
  }

  onValorApostaChanged() {
    /*this.setState({
      valorAposta: pValorAposta
    })*/
    console.log(this.state.valorAposta);
    console.log("voltou");
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <MenuApp />
        <br /><br /><br />
        <Grid columns={3} stackable padded>
        <Grid.Row stretched>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column><ValorAposta gasPrice={this.state.gasPrice} onValorApostaChanged = {this.onValorApostaChanged} valorAposta = {this.state.valorAposta} /></Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
