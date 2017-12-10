import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { createBloj, updateBloj } from '../actions/blojs';
import './Bloj.css';

class Bloj extends Component {
  static propTypes = {
    createBloj: PropTypes.func.isRequired,
    updateBloj: PropTypes.func.isRequired,

    node: PropTypes.object.isRequired,
    bloj: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bloj: props.bloj || {
        index: '',
        prevHash: '',
        data: '',
      }, 
      socket: null,
    };
  }

  componentDidMount() {
    if (this.state.bloj.hash) {
      this.setState({
        socket: io(`http://${this.props.node.meta.serverHost}:${this.props.node.meta.serverPort}`),
      });
    }
  }

  onChange(key, value) {
    const bloj = Object.assign({}, this.state.bloj, {
      [key]: value
    });

    this.setState({ bloj });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.bloj.hash) {
      this.props.updateBloj(this.state.bloj, this.props.node);
    } else {  
      this.props.createBloj(this.state.bloj, this.props.node);
        
      this.setState({
        bloj: {
          index: '',
          prevHash: '',
          data: '',
        }
      });
    }
  }

  render() {
    return (
      <div 
        className="bloj"
      >
        <form
          onSubmit={this.onSubmit}
        >
          <div>
            <label>Index</label>
            <input 
              type="text" 
              value={this.state.bloj.index} 
              onChange={e => this.onChange('index', e.target.value)}
            />
          </div>

          <div>
            <label>Previous hash</label>
            <input
              type="text"
              value={this.state.bloj.prevHash}
              onChange={e => this.onChange('prevHash', e.target.value)}
            />
          </div>
          
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
          
          <div>
            <label>Data</label>
            <input
              type="text"
              value={this.state.bloj.data}
              onChange={e => this.onChange('data', e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              value={this.state.bloj.hash ? 'Update' : 'Create'}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), {
  createBloj,
  updateBloj,
})(Bloj);