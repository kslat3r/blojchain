import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getBlojs, addBloj, updateBloj } from '../actions/blojs';
import { getMiningQueue, addBlojToMiningQueue, removeBlojFromMiningQueue } from '../actions/mining-queue';
import { getVerificationQueue, addBlojToVerificationQueue, removeBlojFromVerificationQueue } from '../actions/verification-queue';
import { getConfirmationQueue, addBlojToConfirmationQueue, removeBlojFromConfirmationQueue } from '../actions/confirmation-queue';
import { getLogs, addLog } from '../actions/logs';
import { Row, Col, Button } from 'reactstrap';
import Queue from '../components/Queue';
import Bloj from '../components/Bloj';
import Form from './Form';
import './Node.css';

class Node extends Component {
  static propTypes = {
    getBlojs: PropTypes.func.isRequired,
    addBloj: PropTypes.func.isRequired,
    updateBloj: PropTypes.func.isRequired,
    getMiningQueue: PropTypes.func.isRequired,
    addBlojToMiningQueue: PropTypes.func.isRequired,
    removeBlojFromMiningQueue: PropTypes.func.isRequired,
    getVerificationQueue: PropTypes.func.isRequired,
    addBlojToVerificationQueue: PropTypes.func.isRequired,
    removeBlojFromVerificationQueue: PropTypes.func.isRequired,
    getConfirmationQueue: PropTypes.func.isRequired,
    addBlojToConfirmationQueue: PropTypes.func.isRequired,
    removeBlojFromConfirmationQueue: PropTypes.func.isRequired,
    getLogs: PropTypes.func.isRequired,
    addLog: PropTypes.func.isRequired,

    blojs: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    miningQueue: PropTypes.object.isRequired,
    verificationQueue: PropTypes.object.isRequired,
    confirmationQueue: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
    };
  }

  componentDidMount() {
    this.props.getBlojs(this.props.node);
    this.props.getMiningQueue(this.props.node);
    this.props.getVerificationQueue(this.props.node);
    this.props.getConfirmationQueue(this.props.node);
    this.props.getLogs(this.props.node);

    const socket = io(`http://${this.props.node.meta.socketHost}:${this.props.node.meta.socketPort}`);
    
    socket.on(`${this.props.node.host}:bloj:create`, (bloj) => {
      this.props.addBloj(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:bloj:update`, (bloj) => {
      this.props.updateBloj(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:miner:push`, (bloj) => {
      this.props.addBlojToMiningQueue(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:miner:remove`, (bloj) => {
      this.props.removeBlojFromMiningQueue(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:verifier:push`, (bloj) => {
      this.props.addBlojToVerificationQueue(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:verifier:remove`, (bloj) => {
      this.props.removeBlojFromVerificationQueue(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:confirmer:push`, (bloj) => {
      this.props.addBlojToConfirmationQueue(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:confirmer:remove`, (bloj) => {
      this.props.removeBlojFromConfirmationQueue(bloj, this.props.node);
    });

    socket.on(`${this.props.node.host}:log`, (log) => {
      this.props.addLog(log, this.props.node);
    });
  }

  render() {
    const node = this.props.node;
    const blojs = this.props.blojs;
    const miningQueue = this.props.miningQueue;
    const verificationQueue = this.props.verificationQueue;
    const confirmationQueue = this.props.confirmationQueue;

    const blojsError = blojs[node.meta.id] ? blojs[node.meta.id].error : null;
    const miningQueueError = miningQueue[node.meta.id] ? miningQueue[node.meta.id].error : null;
    const verificationQueueError = verificationQueue[node.meta.id] ? verificationQueue[node.meta.id].error : null;
    const confirmationQueueError = confirmationQueue[node.meta.id] ? confirmationQueue[node.meta.id].error : null;
    
    const blojsLoading = blojs[node.meta.id] ? blojs[node.meta.id].loading : null;
    const miningQueueLoading = miningQueue[node.meta.id] ? miningQueue[node.meta.id].loading : null;
    const verificationQueueLoading = verificationQueue[node.meta.id] ? verificationQueue[node.meta.id].loading : null;
    const confirmationQueueLoading = confirmationQueue[node.meta.id] ? confirmationQueue[node.meta.id].loading : null;

    const blojItems = blojs[node.meta.id] ? blojs[node.meta.id].items : []; 
    const miningQueueItems = miningQueue[node.meta.id] ? miningQueue[node.meta.id].items : []; 
    const verificationQueueItems = verificationQueue[node.meta.id] ? verificationQueue[node.meta.id].items : []; 
    const confirmationQueueItems = confirmationQueue[node.meta.id] ? confirmationQueue[node.meta.id].items : []; 

    return (
      <Row className="node">
        <Col xs={12}>
          <div className="title clearfix">
            <h1 className="float-left">{node.host}</h1>
            
            <a className="float-right" href={`http://${node.meta.serverHost}:${node.meta.serverPort}/explorer`} target="_new">
              <Button color="primary">Explorer</Button>
            </a>
          </div>

          <Queue
            title={`Blojchain (${blojItems.length})`}
            open={true}
            error={blojsError}
            loading={blojsLoading}
            forceScroll={true}
          >
            {blojItems.map((item, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <Bloj
                  node={node}
                  bloj={item}
                />
              </Col>
            ))}

            <Col xs={12} md={6} lg={4}>
              <Form
                node={node}
              />
            </Col>
          </Queue>
        </Col>

        <Col xs={12} lg={4}>
          <Queue
            title={`Mining queue (${miningQueueItems.length})`}
            open={true}
            error={miningQueueError}
            loading={miningQueueLoading}
          >
            {miningQueueItems.map((item, i) => (
              <Col key={i} xs={12}>
                <Bloj
                  bloj={item}
                />
              </Col>
            ))}
          </Queue>
        </Col>

        <Col xs={12} lg={4}>
          <Queue
            title={`Verification queue (${verificationQueueItems.length})`}
            open={true}
            error={verificationQueueError}
            loading={verificationQueueLoading}
            items={verificationQueueItems}
          >
            {verificationQueueItems.map((item, i) => (
              <Col key={i} xs={12}>
                <Bloj
                  bloj={item}
                />
              </Col>
            ))}
          </Queue>
        </Col>

        <Col xs={12} lg={4}>
          <Queue
            title={`Confirmation queue (${confirmationQueueItems.length})`}
            open={true}
            error={confirmationQueueError}
            loading={confirmationQueueLoading}
            items={confirmationQueueItems}
          >
            {confirmationQueueItems.map((item, i) => (
              <Col key={i} xs={12}>
                <Bloj
                  bloj={item}
                />
              </Col>
            ))}
          </Queue>
        </Col>
      </Row>
    );
  }
}

export default connect((state) => ({
  blojs: state.blojs.toJS(),
  miningQueue: state.miningQueue.toJS(),
  verificationQueue: state.verificationQueue.toJS(),
  confirmationQueue: state.confirmationQueue.toJS(),
}), {
  getBlojs,
  addBloj,
  updateBloj,
  getMiningQueue,
  addBlojToMiningQueue,
  removeBlojFromMiningQueue,
  getVerificationQueue,
  addBlojToVerificationQueue,
  removeBlojFromVerificationQueue,
  getConfirmationQueue,
  addBlojToConfirmationQueue,
  removeBlojFromConfirmationQueue,
  getLogs,
  addLog,
})(Node);