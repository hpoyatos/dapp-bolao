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

class ValorAposta extends Component {
  render() {
    console.log(bolao);
    return (<Container>
      <Header as='h3' block>
        <Icon name='money bill alternate outline' />
        <Header.Content>Valor da Aposta</Header.Content>
      </Header>

      <Grid columns='equal' stackable padded>
        <Grid.Column><Input
        label='ETH'
        labelPosition='right'
        defaultValue='52.03' />
        </Grid.Column>
        <Grid.Column>
          <Button icon color='blue' labelPosition='left' size='medium'>
            <Icon name='save' />
            Atualizar
          </Button>
        </Grid.Column>
      </Grid>
     </Container>);
  }
}
export default ValorAposta;
