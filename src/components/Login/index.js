import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import Login from './Login';

class LoginContainer extends Component {
  state = {
    formActive: false,
    email: '',
    isEmailValid: false,
    name: '',
    password: '',
  };

  _handleNameChange = e => {
    this.setState({
      name: e.target.value,
      formActive: true,
    });
  };

  _handleEmailChange = e => {
    const isValid = isEmail(e.target.value);
    this.setState({
      email: e.target.value,
      isEmailValid: isValid,
      formActive: true,
    });
  };

  _handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
      formActive: true,
    });
  };

  _handleSubmit = e => {
    e.preventDefault();
    console.log('Logging in...');
  };

  render() {
    const { formActive, email, isEmailValid, name, password } = this.state;
    return (
      <Login
        formActive={formActive}
        email={email}
        isEmailValid={isEmailValid}
        password={password}
        name={name}
        handleSubmit={this._handleSubmit}
        handleNameChange={this._handleNameChange}
        handleEmailChange={this._handleEmailChange}
        handlePasswordChange={this._handlePasswordChange}
      />
    );
  }
}

export default withRouter(LoginContainer);
