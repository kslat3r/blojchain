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
      newBloj: {
        index: '',
        prevHash: '',
        data: '',
      },
    };
  }

  onChange(key, value) {
    const newBloj = Object.assign({}, this.state.newBloj, {
      [key]: value
    });

    this.setState({ newBloj });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.createBloj(this.state.newBloj, this.props.node);
    
    this.setState({
      newBloj: {
        index: '',
        prevHash: '',
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
          <div>
            <label>Index</label>
            <input 
              type="text" 
              value={(this.props.bloj && this.props.bloj.index) || this.state.newBloj.index} 
              readOnly={this.props.bloj}
              onChange={e => this.onChange('index', e.target.value)}
            />
          </div>

          <div>
            <label>Previous hash</label>
            <input
              type="text"
              value={(this.props.bloj && this.props.bloj.prevHash) || this.state.newBloj.prevHash}
              onChange={e => this.onChange('prevHash', e.target.value)}
            />
          </div>
          
          {this.props.bloj && (
            <div>
              <label>Nonce</label>
              <input
                type="text"
                value={this.props.bloj && this.props.bloj.nonce}
                readOnly
              />
            </div>
          )}
          
          {this.props.bloj && (
            <div>
              <label>Hash</label>
              <input
                type="text"
                value={this.props.bloj && this.props.bloj.hash}
                readOnly
              />
            </div>
          )}
          
          <div>
            <label>Data</label>
            <input
              type="text"
              value={(this.props.bloj && this.props.bloj.data) || this.state.newBloj.data}
              readOnly={this.props.bloj}
              onChange={e => this.onChange('data', e.target.value)}
            />
          </div>

          {!this.props.bloj && (
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