import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import { Button } from 'reactstrap';
import './BlojTag.css';

class BlojTag extends Component {
  static propTypes = {
    bloj: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    if (!deepEqual(this.props.bloj, nextProps.bloj)) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Button color="info" className="blojtag">{this.props.bloj.id.substring(0, 10)}&hellip;</Button>
    );
  }
}

export default BlojTag;