import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Log.css';

const Log = (props) => (
  <div className="log">
    <span className="host" style={{color: props.log.node.colour}}>
      {props.log.node.host}
    </span>

    <span className="timestamp">
      {moment(props.log.timestamp).format()}
    </span>

    <span className={props.log.type}>
      {props.log.type}
    </span>

    <span className="message">
      {props.log.args.map((arg) => {
        if (typeof arg !== 'string') {
          arg = JSON.stringify(arg);
        }

        return `${arg} `
      })}
    </span>
  </div>
);

Log.propTypes = {
  log: PropTypes.object.isRequired,
};

export default Log;