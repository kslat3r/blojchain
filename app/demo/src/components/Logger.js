import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from './Log';
import { Button } from 'reactstrap';
import './Logger.css';

class Logger extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onLogClick = this.onLogClick.bind(this);

    this.state = {
      open: false,
      selectedHost: null
    };
  }

  componentDidUpdate() {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  }

  onToggle(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open,
    }, () => {
      const body = document.getElementsByTagName('body')[0];
      const className = 'logger-open';

      if (this.state.open) {
        body.classList.add(className);
      } else {
        body.classList.remove(className);
      }
    });
  }

  onReset(e) {
    e.preventDefault();

    this.setState({ selectedHost: null });
  }

  onLogClick(e, log) {
    e.preventDefault();

    this.setState({ selectedHost: log.node.host });
  }

  render() {
    let logs = this.props.logs;

    if (this.state.selectedHost) {
      logs = logs.filter(log => log.node.host === this.state.selectedHost);
    }

    return (
      <div className={`logger ${this.state.open && 'open'}`}>
        <a href="#toggle" onClick={this.onToggle} id="toggle">
          <Button color="secondary">
            {this.state.open ? 'Minimise' : 'Maximise'}
          </Button>
        </a>

        <a href="#reset" onClick={this.onReset} id="reset">
          <Button color="secondary">
            Reset
          </Button>
        </a>

        <div className="scroll" ref={(elem) => { this.scroll = elem; }}>
          {logs.map((log, i) => {
            return (
              <Log
                key={i}
                log={log}
                onLogClick={this.onLogClick}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default Logger;
