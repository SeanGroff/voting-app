import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import DefaultLayout from '../DefaultLayout';

export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <DefaultLayout />
      </Container>
    );
  }
}
