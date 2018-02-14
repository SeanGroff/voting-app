import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function TopBar({
  activeItem,
  authenticated,
  isActive,
  handleClick,
  handleHamburgerClick,
}) {
  return (
    <nav className="navbar is-transparent" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">Pollz</div>
          <button
            className={`button navbar-burger ${isActive ? 'is-active' : ''}`}
            onClick={handleHamburgerClick}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link
              className={`navbar-item is-hoverable ${
                activeItem === 'home' ? 'is-active' : ''
              }`}
              to="/"
              onClick={() => handleClick('home')}
            >
              {'Home'}
            </Link>
          </div>
          <div className="navbar-end">
            <Link
              className={`${authenticated ? 'hide' : ''} navbar-item ${
                activeItem === 'signup' ? 'is-active' : ''
              }`}
              to="/signup"
              onClick={() => handleClick('signup')}
            >
              {'Sign up'}
            </Link>
            <Link
              className={`${authenticated ? 'hide' : ''} navbar-item ${
                activeItem === 'login' ? 'is-active' : ''
              }`}
              to="/login"
              onClick={() => handleClick('login')}
            >
              {'Login'}
            </Link>
            <div
              className={`${
                authenticated ? '' : 'hide'
              } navbar-item has-dropdown is-hoverable ${
                activeItem === 'mypolls' ? 'is-active' : ''
              }`}
            >
              <Link
                className="navbar-link"
                to="/mypolls"
                onClick={() => handleClick('mypolls')}
              >
                {'My Polls'}
              </Link>
              <div class="navbar-dropdown is-boxed">
                <Link class="navbar-item" to="/new">
                  {'New'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

TopBar.propTypes = {
  activeItem: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleHamburgerClick: PropTypes.func.isRequired,
};
