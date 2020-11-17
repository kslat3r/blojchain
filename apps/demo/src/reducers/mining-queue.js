import Immutable from 'immutable';
import { MINING_QUEUE_GET, MINING_QUEUE_GET_SUCCEEDED, MINING_QUEUE_GET_FAILED, MINING_QUEUE_ADD_SUCCEEDED, MINING_QUEUE_ADD_FAILED, MINING_QUEUE_REMOVE_SUCCEEDED, MINING_QUEUE_REMOVE_FAILED } from '../actions/mining-queue';

const initialState = Immutable.Map({});

export default function(state = initialState, action) {
  switch (action.type) {
    case MINING_QUEUE_GET: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: [],
        loading: true,
        error: null,
      };
    
      return Immutable.Map(currentState);
    }

    case MINING_QUEUE_GET_SUCCEEDED: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: action.data,
        error: null,
      };
    
      return Immutable.Map(currentState);
    }

    case MINING_QUEUE_ADD_SUCCEEDED: {
      const currentState = state.toJS();
    
      currentState[action.node.meta.id].items.push(action.bloj);
        
      return Immutable.Map(currentState);
    }

    case MINING_QUEUE_REMOVE_SUCCEEDED: {
      const currentState = state.toJS();
      const foundIndex = currentState[action.node.meta.id].items.findIndex(c => c.id === action.bloj.id);
    
      currentState[action.node.meta.id].items.splice(foundIndex, 1);
        
      return Immutable.Map(currentState);
    }

    case MINING_QUEUE_GET_FAILED:
    case MINING_QUEUE_ADD_FAILED:
    case MINING_QUEUE_REMOVE_FAILED: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: [],
        error: action.error,
      };
      
      return Immutable.Map(currentState);
    }

    default:
      return state;
  }
}