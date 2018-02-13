import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import './polls.css';

export default function Polls({ polls, handleClick }) {
  return (
    <Fragment>
      <Header>Polls</Header>
      <ul className="polls">
        {polls && polls.length
          ? polls.map((poll, index) => (
              <li className="box" key={index} onClick={() => handleClick(poll)}>
                {poll.name}
              </li>
            ))
          : null}
      </ul>
    </Fragment>
  );
}

Polls.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func.isRequired,
};
