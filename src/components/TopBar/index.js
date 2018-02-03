import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TopBar extends Component {
  state = {
    activeItem: '',
  };

  componentDidMount() {
    this.setState(() => ({
      activeItem: 'home',
    }));
  }

  _handleClick = activeItem => {
    this.setState(() => ({
      activeItem,
    }));
  };

  render() {
    const { activeItem } = this.state;
    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <div className="navbar-item">Pollz</div>
            <button className="button navbar-burger">
              <span>Home</span>
              <span>Login</span>
              <span>Sign up</span>
            </button>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link
                className={`navbar-item ${
                  activeItem === 'home' ? 'is-active' : ''
                }`}
                to="/"
                onClick={() => this._handleClick('home')}
              >
                {'Home'}
              </Link>
            </div>
            <div className="navbar-end">
              <Link
                className={`navbar-item ${
                  activeItem === 'login' ? 'is-active' : ''
                }`}
                to="/login"
                onClick={() => this._handleClick('login')}
              >
                {'Login'}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
