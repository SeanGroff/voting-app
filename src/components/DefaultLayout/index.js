import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import TopBar from '../TopBar';
import Hero from '../Hero';
import Polls from '../Polls';
import Login from '../Login';
import NewPoll from '../NewPoll';
import PollDetail from '../Polls/PollDetail';

export default class DefaultLayout extends Component {
  render() {
    return (
      <Router>
        <div>
          <TopBar />
          <Hero />
          <section className="container" style={{ maxWidth: '769px' }}>
            <Route exact path="/" component={Polls} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new" component={NewPoll} />
            <Route exact path="/poll" component={PollDetail} />
          </section>
        </div>
      </Router>
    );
  }
}
