import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import TopBar from '../TopBar';
import Polls from '../Polls';
import Login from '../Login';

export default class DefaultLayout extends Component {
  render() {
    return (
      <Router>
        <Container fluid={true} style={{ height: '100%' }}>
          <TopBar />
          <Grid centered stretched style={{ height: '100%' }}>
            <Grid.Column verticalAlign="middle">
              <Route exact path="/" component={Polls} />
              <Route exact path="/login" component={Login} />
            </Grid.Column>
          </Grid>
        </Container>
      </Router>
    );
  }
}
