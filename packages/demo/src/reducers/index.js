import { combineReducers } from 'redux';
import nodes from './nodes';
import blojs from './blojs';
import logs from './logs';

export default combineReducers({
  nodes,
  blojs,
  logs,
});