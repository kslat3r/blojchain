import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBloj } from '../actions/blojs';
import './Bloj.css';

class Bloj extends Component {
  static propTypes = {
    createBloj: PropTypes.func.isRequired,

    node: PropTypes.object.isRequired,
    bloj: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bloj: props.bloj || {
        data: '',
      }, 
      socket: null,
    };
  }

  onChange(key, value) {
    const bloj = Object.assign({}, this.state.bloj, {
      [key]: value
    });

    this.setState({ bloj });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.createBloj(JSON.parse(this.state.bloj.data), this.props.node);
        
    this.setState({
      bloj: {
        data: '',
      }
    });
  }

  render() {
    return (
      <div 
        className="bloj"
      >
        <form
          onSubmit={this.onSubmit}
        >
          {this.state.bloj.index && (
            <div>
              <label>Index</label>
              <input 
                type="text" 
                value={this.state.bloj.index} 
                onChange={e => this.onChange('index', e.target.value)}
              />
            </div>
          )}

          {this.state.bloj.nonce && (
            <div>
              <label>Nonce</label>
              <input
                type="text"
                value={this.state.bloj.nonce}
                onChange={e => this.onChange('nonce', e.target.value)}
              />
            </div>
          )}

          <div>
            <label>Data</label>
            <textarea
              type="text"
              value={this.state.bloj.hash ? JSON.stringify(this.state.bloj.data) : this.state.bloj.data}
              onChange={e => this.onChange('data', e.target.value)}
            />
          </div>

          {this.state.bloj.prevHash && (
            <div>
              <label>Previous hash</label>
              <input
                type="text"
                value={this.state.bloj.prevHash}
                onChange={e => this.onChange('prevHash', e.target.value)}
              />
            </div>
          )}

          {this.state.bloj.timestamp && (
            <div>
              <label>Timestamp</label>
              <input
                type="text"
                value={this.state.bloj.timestamp}
                onChange={e => this.onChange('timestamp', e.target.value)}
              />
            </div>
          )}
          
          {this.state.bloj.hash && (
            <div>
              <label>Hash</label>
              <input
                type="text"
                value={this.state.bloj.hash}
                onChange={e => this.onChange('hash', e.target.value)}
              />
            </div>
          )}

          {this.state.bloj.confirmations !== undefined && (
            <div>
              <label>Confirmations</label>
              <input
                type="text"
                value={this.state.bloj.confirmations}
                onChange={e => this.onChange('confirmations', e.target.value)}
              />
            </div>
          )}
          
          {!this.state.bloj.hash && (
            <div>
              <input
                type="submit"
                value="Create"
              />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), {
  createBloj,
})(Bloj);