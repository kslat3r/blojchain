import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodes } from '../actions/nodes';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Node from '../containers/Node';
import './App.css';

class App extends Component {
  static propTypes = {
    getNodes: PropTypes.func.isRequired,

    error: PropTypes.object,
    nodes: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getNodes(this.props.nodes[0]);
  }

  render() {
    if (this.props.error) {
      return <Error />
    }

    if (!this.props.nodes.length) {
      return <Loading />
    }

    return this.props.nodes.map((node, i) => (
      <Node
        key={i}
        node={node}
      />
    ));
  }
}

export default connect((state) => ({
  error: state.nodes.toJS().error,
  nodes: state.nodes.toJS().items,
}), {
  getNodes,
})(App);