import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from '../common/Header';

export default function SignUp({
  formActive,
  email,
  isEmailValid,
  passwordsMatch,
  password,
  passwordConfirm,
  name,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handlePasswordConfirmChange,
  handleSubmit,
}) {
  return (
    <form className="columns is-centered is-marginless" onSubmit={handleSubmit}>
      <div className="column" style={{ maxWidth: '512px' }}>
        <Header>Get Started Creating Polls Today!</Header>
        <div className="field">
          <label className="label">Name</label>
          <div className="control has-icons-left">
            <input
              className={`input ${
                formActive && name && name.length ? 'is-success' : ''
              }`}
              type="text"
              placeholder="Text input"
              required
              value={name}
              onChange={handleNameChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input
              className={`input ${isEmailValid && email ? 'is-success' : ''}`}
              type="email"
              placeholder="Email"
              required
              onChange={handleEmailChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>
          <p
            className={
              formActive && email.length && !isEmailValid
                ? 'help is-danger'
                : 'is-invisible'
            }
          >
            This email is invalid
          </p>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              className={`input ${
                passwordsMatch && passwordConfirm ? 'is-success' : ''
              }`}
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-unlock-alt" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control has-icons-left">
            <input
              className={`input ${
                passwordsMatch && passwordConfirm ? 'is-success' : ''
              }`}
              type="password"
              placeholder="Confirm Password"
              required
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-unlock-alt" />
            </span>
          </div>
          <p
            className={`${
              formActive && password.length && !passwordsMatch
                ? 'help is-danger'
                : 'is-invisible'
            }`}
          >
            Passwords do not match.
          </p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-success is-link"
              disabled={!passwordsMatch}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <div className="control">
            <Link to="/" className="button is-danger is-link">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

SignUp.propTypes = {
  formActive: PropTypes.bool,
  email: PropTypes.string,
  isEmailValid: PropTypes.bool,
  passwordsMatch: PropTypes.bool,
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  name: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordConfirmChange: PropTypes.func.isRequired,
};
