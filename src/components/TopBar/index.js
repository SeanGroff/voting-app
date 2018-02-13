import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBar from './TopBar';

export default class TopBarContainer extends Component {
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
      isActive: false,
    }));
  };

  _handleHamburgerClick = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  };

  render() {
    const { activeItem, isActive } = this.state;
    const { authenticated } = this.props;
    return (
      <TopBar
        activeItem={activeItem}
        authenticated={authenticated}
        isActive={isActive}
        handleClick={this._handleClick}
        handleHamburgerClick={this._handleHamburgerClick}
      />
    );
  }
}

TopBarContainer.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
