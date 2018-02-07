import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

import SignUp from './SignUp';

export default class SignUpContainer extends Component {
  state = {
    formActive: false,
    email: '',
    isEmailValid: false,
    passwordsMatch: false,
    name: '',
    password: '',
    passwordConfirm: '',
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
    const doPasswordsMatch = this.state.passwordConfirm === e.target.value;
    this.setState({
      password: e.target.value,
      passwordsMatch: doPasswordsMatch,
      formActive: true,
    });
  };

  _handlePasswordConfirmChange = e => {
    const doPasswordsMatch = this.state.password === e.target.value;
    this.setState({
      passwordConfirm: e.target.value,
      passwordsMatch: doPasswordsMatch,
      formActive: true,
    });
  };

  _handleSubmit = e => {
    e.preventDefault();
    console.log('Registering...');
  };

  render() {
    const {
      formActive,
      email,
      isEmailValid,
      name,
      passwordsMatch,
      password,
      passwordConfirm,
    } = this.state;
    return (
      <SignUp
        formActive={formActive}
        email={email}
        isEmailValid={isEmailValid}
        passwordsMatch={passwordsMatch}
        password={password}
        passwordConfirm={passwordConfirm}
        name={name}
        handleSubmit={this._handleSubmit}
        handleNameChange={this._handleNameChange}
        handleEmailChange={this._handleEmailChange}
        handlePasswordChange={this._handlePasswordChange}
        handlePasswordConfirmChange={this._handlePasswordConfirmChange}
      />
    );
  }
}
