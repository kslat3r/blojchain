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

    blojs: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getBlojs(this.props.node);
  }

  render() {
    const node = this.props.node;
    const blojs = this.props.blojs.toJS();

    const items = blojs[node.meta.id] ? blojs[node.meta.id].items : []; 
    const error = blojs[node.meta.id] ? blojs[node.meta.id].error : null;

    return (
      <div className="node">
        <h1>{node.meta.id}</h1>
        <h2>{node.meta.serverHost}:{node.meta.serverPort}</h2>

        <div className="bloj-list">
          {error && (
            <Error />
          )}

          {!items.length && (
            <Loading />
          )}

          {items.map((bloj, i) => (
            <Bloj
              key={i}
              node={node}
              bloj={bloj}
            />
          ))}

          <Bloj
            node={node}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  blojs: state.blojs,
}), {
  getBlojs,
})(Node);