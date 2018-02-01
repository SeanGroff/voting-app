import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

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
      <Menu color="teal" size="huge" inverted fluid stackable tabular>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={() => this._handleClick('home')}
        >
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/login"
          name="signin"
          active={activeItem === 'signin'}
          onClick={() => this._handleClick('signin')}
        >
          Sign in
        </Menu.Item>
      </Menu>
    );
  }
}
