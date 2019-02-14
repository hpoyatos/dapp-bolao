import React, { Component } from 'react';
import MenuApp from './components/MenuApp';
import ValorAposta from './components/ValorAposta';

import {
  Grid
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuApp />
        <br /><br /><br />
        <Grid columns={3} stackable padded>
        <Grid.Row stretched>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column><ValorAposta /></Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
