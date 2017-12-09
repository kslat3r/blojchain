import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlojs } from '../actions/blojs';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Bloj from '../containers/Bloj';
import './Node.css';

class Node extends Component {
  static propTypes = {
    getBlojs: PropTypes.func.isRequired,

    error: PropTypes.object,
    blojs: PropTypes.array.isRequired,
    node: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getBlojs(this.props.node);
  }

  render() {
    return (
      <div className="node">
        <h1>{this.props.node.meta.id}</h1>
        <h2>{this.props.node.meta.serverHost}:{this.props.node.meta.serverPort}</h2>

        <div className="bloj-list">
          {this.props.error && (
            <Error />
          )}

          {!this.props.blojs.length && (
            <Loading />
          )}

          {this.props.blojs.map((bloj, i) => (
            <Bloj
              key={i}
              bloj={bloj}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  error: state.blojs.toJS()[ownProps.node.meta.id] ?  state.blojs.toJS()[ownProps.node.meta.id].error : null,
  blojs: state.blojs.toJS()[ownProps.node.meta.id] ?  state.blojs.toJS()[ownProps.node.meta.id].items : [],
}), {
  getBlojs,
})(Node);