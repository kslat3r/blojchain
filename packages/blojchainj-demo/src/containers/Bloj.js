import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Bloj.css';

class Bloj extends Component {
  static propTypes = {
    bloj: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="bloj">
        <div>
          <label>Index</label>
          <input type="text" value={this.props.bloj.index} readOnly />
        </div>
        <div>
          <label>Previous hash</label>
          <input type="text" value={this.props.bloj.prevHash} readOnly />
        </div>
        <div>
          <label>Nonce</label>
          <input type="text" value={this.props.bloj.nonce} readOnly />
        </div>
        <div>
          <label>Hash</label>
          <input type="text" value={this.props.bloj.hash} readOnly />
        </div>
        <div>
          <label>Data</label>
          <input type="text" value={this.props.bloj.data} readOnly />
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(Bloj);