import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import TopBar from '../TopBar';
import Hero from '../Hero';
import Polls from '../Polls';
import Login from '../Login';

export default class DefaultLayout extends Component {
  render() {
    return (
      <Router>
        <div>
          <TopBar />
          <Hero />
          <section className="container" style={{ maxWidth: '769px' }}>
            <h1
              className="title has-text-centered"
              style={{ marginTop: '1.5rem' }}
            >
              Page Title
            </h1>
            <Route exact path="/" component={Polls} />
            <Route exact path="/login" component={Login} />
          </section>
        </div>
      </Router>
    );
  }
}
