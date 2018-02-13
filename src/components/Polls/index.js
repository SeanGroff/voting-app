import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';

import Polls from './Polls';
import getPolls from '../../graphql/getPolls';

class PollsContainer extends Component {
  _handleClick = poll => {
    console.log(poll);
    this.props.history.push('/poll', { state: this.props.allPolls.polls });
  };

  render() {
    const { allPolls } = this.props;
    return <Polls handleClick={this._handleClick} polls={allPolls.polls} />;
  }
}

export default compose(withRouter, graphql(getPolls, { name: 'allPolls' }))(
  PollsContainer
);
