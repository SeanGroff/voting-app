import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TopBar extends Component {
  state = {
    activeItem: '',
    isActive: false,
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

  _handleHamburgerClick = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  };

  render() {
    const { activeItem, isActive } = this.state;
    return (
      <nav className="navbar is-light" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">Pollz</div>
            <button
              className={`button navbar-burger ${isActive ? 'is-active' : ''}`}
              onClick={this._handleHamburgerClick}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
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
