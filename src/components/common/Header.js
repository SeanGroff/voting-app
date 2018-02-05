import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ children }) {
  return (
    <h1 className="title has-text-centered has-text-grey-dark">{children}</h1>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
};
