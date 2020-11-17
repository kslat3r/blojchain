import { combineReducers } from 'redux';
import nodes from './nodes';
import blojs from './blojs';
import logs from './logs';
import miningQueue from './mining-queue';
import verificationQueue from './verification-queue';
import confirmationQueue from './confirmation-queue';

export default combineReducers({
  nodes,
  blojs,
  logs,
  miningQueue,
  verificationQueue,
  confirmationQueue,
});