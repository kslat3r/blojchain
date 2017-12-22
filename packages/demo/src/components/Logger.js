import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from './Log';
import './Logger.css';

class Logger extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
  }

  componentDidUpdate() {
    this.elem.scrollTop = this.elem.scrollHeight;    
  }

  render() {
    return (
      <div className="logger" ref={(c) => { this.elem = c; }}>
        {this.props.logs.map((log, i) => {
          return (
            <Log
              key={i}
              log={log}
            />
          )
        })}
      </div>
    );
  }
}

export default Logger;
