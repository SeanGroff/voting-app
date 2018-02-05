import React, { Component } from 'react';

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
    return (
      <TopBar
        activeItem={activeItem}
        isActive={isActive}
        handleClick={this._handleClick}
        handleHamburgerClick={this._handleHamburgerClick}
      />
    );
  }
}
