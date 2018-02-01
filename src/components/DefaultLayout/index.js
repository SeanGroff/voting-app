import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import TopBar from '../TopBar';
import Polls from '../Polls';
// import Login from '../Login';

export default class DefaultLayout extends Component {
  render() {
    return (
      <Router>
        <div className="column">
          <TopBar />
          <div>
            <Route exact path="/" component={Polls} />
            {/*<Route exact path="/login" component={Login} />*/}
          </div>
        </div>
      </Router>
    );
  }
}
