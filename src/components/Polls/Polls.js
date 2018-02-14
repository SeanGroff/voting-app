import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import './polls.css';

export default function Polls({
  authenticated,
  handleClick,
  location,
  polls,
  username,
}) {
  const pollsToRender =
    authenticated && location === 'mypolls'
      ? polls.filter(poll => poll.createdBy === username)
      : polls;
  return (
    <Fragment>
      <Header>Polls</Header>
      <ul className="polls">
        {polls && polls.length
          ? polls.map((poll, index) => (
              <li className="box" key={index} onClick={() => handleClick(poll)}>
                <span>{poll.name}</span>
                <button
                  className={`${
                    poll.createdBy === username ? 'button is-danger' : 'hide'
                  }`}
                >
                  Delete
                </button>
              </li>
            ))
          : null}
      </ul>
    </Fragment>
  );
}

Polls.propTypes = {
  authenticated: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  polls: PropTypes.arrayOf(PropTypes.object),
};
