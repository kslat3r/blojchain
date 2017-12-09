import { combineReducers } from 'redux';
import nodes from './nodes';
import blojs from './blojs';

export default combineReducers({
  nodes,
  blojs,
});