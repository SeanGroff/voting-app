import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import TopBar from '../TopBar';
import Hero from '../Hero';
import Polls from '../Polls';
import Login from '../Login';
import SignUp from '../SignUp';
import NewPoll from '../NewPoll';
import PollDetail from '../Polls/PollDetail';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        props.authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default class DefaultLayout extends Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    /**
     * @to-do verify JWT instead of check localStorage
     */
    if (localStorage.getItem('token')) {
      this.setState(() => ({
        authenticated: true,
      }));
    }
  }

  _handleAuth = authenticated => {
    this.setState(() => ({
      authenticated,
    }));
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Router>
        <div>
          <TopBar authenticated={authenticated} />
          <Hero />
          <section className="container" style={{ maxWidth: '769px' }}>
            <Route exact path="/" component={Polls} />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} handleAuth={this._handleAuth} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <SignUp {...props} handleAuth={this._handleAuth} />
              )}
            />
            <PrivateRoute
              authenticated={authenticated}
              exact
              path="/new"
              component={NewPoll}
            />
            <Route exact path="/poll" component={PollDetail} />
          </section>
        </div>
      </Router>
    );
  }
}
