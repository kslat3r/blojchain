import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodes } from '../actions/nodes';
import { getLogs } from '../actions/logs';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Node from '../containers/Node';
import './App.css';

class App extends Component {
  static propTypes = {
    getNodes: PropTypes.func.isRequired,

    nodes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getNodes();
    this.props.getLogs();
  }

  render() {
    const nodes = this.props.nodes.toJS();
    const error = nodes.error;
    const items = nodes.items;

    if (error) {
      return <Error />
    }

    if (!items.length) {
      return <Loading />
    }

    return items.map((node, i) => (
      <Node
        key={i}
        node={node}
      />
    ));
  }
}

export default connect((state) => ({
  nodes: state.nodes,
  logs: state.logs,
}), {
  getNodes,
  getLogs,
})(App);