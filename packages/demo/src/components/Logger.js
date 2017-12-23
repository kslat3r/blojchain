import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from './Log';
import './Logger.css';

class Logger extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      open: false,
    };
  }

  componentDidUpdate() {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  }

  toggle(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div className={`logger ${this.state.open && 'open'}`}>
        <a href="#" onClick={this.toggle}>
          {!this.state.open ? 'Maximise' : 'Minimise'}
        </a>

        <div className="scroll" ref={(elem) => { this.scroll = elem; }}>
          {this.props.logs.map((log, i) => {
            return (
              <Log
                key={i}
                log={log}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default Logger;
