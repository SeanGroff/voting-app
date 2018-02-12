import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import Login from './Login';

class LoginContainer extends Component {
  state = {
    formActive: false,
    email: '',
    isEmailValid: false,
    password: '',
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

  _handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);

      this.props.history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { formActive, email, isEmailValid, password } = this.state;
    return (
      <Login
        formActive={formActive}
        email={email}
        isEmailValid={isEmailValid}
        password={password}
        handleSubmit={this._handleSubmit}
        handleEmailChange={this._handleEmailChange}
        handlePasswordChange={this._handlePasswordChange}
      />
    );
  }
}

export default withRouter(LoginContainer);
