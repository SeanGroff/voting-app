import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import DefaultLayout from '../DefaultLayout';
import SetupApollo from '../../hoc/SetupApollo';

class App extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    try {
      await this.props.persistor.restore();
      this.setState(() => ({
        loading: false,
      }));
    } catch (err) {
      this.setState(() => ({
        loading: false,
      }));
    }
  }
  render() {
    return (
      <Router>
        <DefaultLayout loading={this.state.loading} />
      </Router>
    );
  }
}

export default SetupApollo(App);
