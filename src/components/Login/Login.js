import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../common/Header';

export default function Login({
  formActive,
  email,
  isEmailValid,
  password,
  name,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <form className="columns is-centered is-marginless" onSubmit={handleSubmit}>
      <div className="column" style={{ maxWidth: '512px' }}>
        <Header>Welcome!</Header>
        <div className="field">
          <label className="label" for="name">
            Name
          </label>
          <div className="control has-icons-left">
            <input
              className={`input ${
                formActive && name && name.length ? 'is-success' : ''
              }`}
              type="text"
              name="name"
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
          <label className="label" for="email">
            Email
          </label>
          <div className="control has-icons-left">
            <input
              className={`input ${isEmailValid && email ? 'is-success' : ''}`}
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
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
          <label className="label" for="password">
            Password
          </label>
          <div className="control has-icons-left">
            <input
              className={`input ${
                password && password.length ? 'is-success' : ''
              }`}
              type="password"
              name="password"
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

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-success is-link"
              disabled={!name.length || !email.length || !password.length}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/" className="button is-danger is-link">
              Cancel
            </Link>
          </div>
          <div className="control" style={{ marginLeft: 'auto' }}>
            <Link to="/signup" className="button is-info is-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

Login.propTypes = {
  formActive: PropTypes.bool,
  email: PropTypes.string,
  isEmailValid: PropTypes.bool,
  password: PropTypes.string,
  name: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};
