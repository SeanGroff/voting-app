import React from 'react';

import Header from '../common/Header';

export default function Login() {
  return (
    <form className="columns is-centered is-marginless">
      <div className="column" style={{ maxWidth: '512px' }}>
        <Header>Welcome!</Header>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-danger"
              type="email"
              placeholder="Email input"
              value="hello@"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle" />
            </span>
          </div>
          <p className="help is-danger">This email is invalid</p>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              value="bulma"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
          <p className="help is-success">This username is available</p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-danger is-link">Cancel</button>
          </div>
          <div className="control" style={{ marginLeft: 'auto' }}>
            <button className="button is-info is-link">Register</button>
          </div>
        </div>
      </div>
    </form>
  );
}
