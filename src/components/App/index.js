import React, { Component } from 'react';

import 'bulma/css/bulma.css';
import DefaultLayout from '../DefaultLayout';

export default class App extends Component {
  render() {
    return (
      <div className="columns is-centered">
        <DefaultLayout />
      </div>
    );
  }
}
