import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
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

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
    };
  }

  componentDidMount() {
    this.props.getBlojs(this.props.node);

    this.setState({
      socket: io(`http://${this.props.node.meta.serverHost}:${this.props.node.meta.serverPort}`),
    });
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