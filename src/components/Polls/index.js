import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Polls from './Polls';

const data = [
  {
    topic: 'What is your favorite color?',
  },
  {
    topic: 'What is your favorite band?',
  },
  {
    topic: 'What is your favorite food?',
  },
  {
    topic: 'What is your favorite programming language?',
  },
  {
    topic: 'What is your favorite sport?',
  },
];

class PollsContainer extends Component {
  state = {
    polls: [],
    myPolls: [],
  };

  async componentDidMount() {
    try {
      const polls = await data;

      this.setState(() => ({
        polls,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  _handleClick = poll => {
    console.log(poll);
    this.props.history.push('/poll');
  };

  render() {
    const { polls } = this.state;
    return <Polls handleClick={this._handleClick} polls={polls} />;
  }
}

export default withRouter(PollsContainer);
