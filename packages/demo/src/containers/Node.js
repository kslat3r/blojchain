import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getBlojs, addBloj } from '../actions/blojs';
import { getCandidates, addCandidate, removeCandidate } from '../actions/candidates';
import { getLogs, addLog } from '../actions/logs';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Bloj from '../containers/Bloj';
import Candidate from '../components/Candidate';
import './Node.css';

class Node extends Component {
  static propTypes = {
    getBlojs: PropTypes.func.isRequired,
    addBloj: PropTypes.func.isRequired,
    getCandidates: PropTypes.func.isRequired,
    addCandidate: PropTypes.func.isRequired,
    removeCandidate: PropTypes.func.isRequired,
    getLogs: PropTypes.func.isRequired,
    addLog: PropTypes.func.isRequired,

    blojs: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    candidates: PropTypes.object.isRequired,
    maximised: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      socket: null,
      maximised: props.maximised,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.maximised !== nextProps.maximised) {
      this.setState({
        maximised: nextProps.maximised,
      });
    }
  }

  componentDidMount() {
    this.props.getBlojs(this.props.node);
    this.props.getCandidates(this.props.node);
    this.props.getLogs(this.props.node);

    const socket = io(`http://${this.props.node.meta.socketHost}:${this.props.node.meta.socketPort}`);
    
    socket.on(`${this.props.node.host}:create`, (bloj) => {
      this.props.addBloj(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:candidate:add`, (candidate) => {
      this.props.addCandidate(candidate, this.props.node);
    });

    socket.on(`${this.props.node.host}:candidate:remove`, (candidate) => {
      this.props.removeCandidate(candidate, this.props.node);
    });

    socket.on(`${this.props.node.host}:log`, (log) => {
      this.props.addLog(log, this.props.node);
    });
  }

  componentDidUpdate() {
    this.blojList.scrollLeft = this.blojList.scrollWidth;
  }

  toggle(e) {
    e.preventDefault();

    this.setState({
      maximised: !this.state.maximised,
    });
  }

  render() {
    const node = this.props.node;
    const blojs = this.props.blojs;
    const candidates = this.props.candidates;

    const blojsError = blojs[node.meta.id] ? blojs[node.meta.id].error : null;
    const candidatesError = candidates[node.meta.id] ? candidates[node.meta.id].error : null;

    const blojItems = blojs[node.meta.id] ? blojs[node.meta.id].items : []; 
    const candidateItems = candidates[node.meta.id] ? candidates[node.meta.id].items : []; 

    return (
      <div className="node">
        {blojsError && (
          <Error message={blojsError.message} />
        )}

        {candidatesError && (
          <Error message={candidatesError.message} />
        )}

        {!blojsError && !candidatesError && !blojItems.length && (
          <Loading />
        )}

        <h1>{node.meta.id}</h1>
        <h2>
          <a href={`http://${node.meta.serverHost}:${node.meta.serverPort}/explorer`} target="_new">{node.host}</a>
        </h2>

        <a className="toggle" href="#toggle" onClick={this.toggle}>
          {this.state.maximised ? 'Minimise blojchain' : 'Maximise blojchain'}
        </a>

        <div className="bloj-list" ref={(elem) => { this.blojList = elem; }}>
          {blojItems.map((item, i) => (
            <Bloj
              key={i}
              node={node}
              bloj={item}
              condensed={!this.state.maximised}
            />
          ))}

          {this.state.maximised && (
            <Bloj
              node={node}
            />
          )}
        </div>

        {candidateItems.length > 0 ? (
          <div className="candidate-list">
            {candidateItems.map((item, i) => (
              <Candidate
                key={i}
                candidate={item}
                condensed={!this.state.candidateListOpen}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect((state) => ({
  blojs: state.blojs.toJS(),
  candidates: state.candidates.toJS(),
}), {
  getBlojs,
  addBloj,
  getCandidates,
  addCandidate,
  removeCandidate,
  getLogs,
  addLog,
})(Node);