import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getBlojs, addBloj } from '../actions/blojs';
import { getLogs, addLog } from '../actions/logs';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Bloj from '../containers/Bloj';
import './Node.css';

class Node extends Component {
  static propTypes = {
    getBlojs: PropTypes.func.isRequired,
    addBloj: PropTypes.func.isRequired,
    getLogs: PropTypes.func.isRequired,
    addLog: PropTypes.func.isRequired,

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
    this.props.getLogs(this.props.node);

    const socket = io(`http://${this.props.node.meta.socketHost}:${this.props.node.meta.socketPort}`);
    
    socket.on(`${this.props.node.host}:create`, (bloj) => {
      this.props.addBloj(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:log`, (log) => {
      this.props.addLog(log, this.props.node);
    });
  }

  render() {
    const node = this.props.node;
    const blojs = this.props.blojs;

    const items = blojs[node.meta.id] ? blojs[node.meta.id].items : []; 
    const error = blojs[node.meta.id] ? blojs[node.meta.id].error : null;

    return (
      <div className="node">
        <h1>{node.meta.id}</h1>
        <h2>
          <a href={`http://${node.meta.serverHost}:${node.meta.serverPort}/explorer`} target="_new">{node.host}</a>
        </h2>

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
  blojs: state.blojs.toJS(),
}), {
  getBlojs,
  addBloj,
  getLogs,
  addLog,
})(Node);