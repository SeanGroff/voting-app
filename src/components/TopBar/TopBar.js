import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function TopBar({
  activeItem,
  isActive,
  handleClick,
  handleHamburgerClick,
}) {
  return (
    <nav className="navbar is-light" aria-label="main navigation">
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
              className={`navbar-item ${
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
              className={`navbar-item ${
                activeItem === 'login' ? 'is-active' : ''
              }`}
              to="/login"
              onClick={() => handleClick('login')}
            >
              {'Login'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

TopBar.propTypes = {
  activeItem: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleHamburgerClick: PropTypes.func.isRequired,
};
