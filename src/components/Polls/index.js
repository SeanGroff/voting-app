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
    const { allPolls, authenticated, location } = this.props;
    return (
      <Polls
        authenticated={authenticated}
        handleClick={this._handleClick}
        location={location.pathname}
        polls={allPolls.polls}
      />
    );
  }
}

export default compose(withRouter, graphql(getPolls, { name: 'allPolls' }))(
  PollsContainer
);
