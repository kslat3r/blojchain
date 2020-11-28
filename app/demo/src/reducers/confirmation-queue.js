import Immutable from 'immutable';
import { CONFIRMATION_QUEUE_GET, CONFIRMATION_QUEUE_GET_SUCCEEDED, CONFIRMATION_QUEUE_GET_FAILED, CONFIRMATION_QUEUE_ADD_SUCCEEDED, CONFIRMATION_QUEUE_ADD_FAILED, CONFIRMATION_QUEUE_REMOVE_SUCCEEDED, CONFIRMATION_QUEUE_REMOVE_FAILED } from '../actions/confirmation-queue';

const initialState = Immutable.Map({});

export default function(state = initialState, action) {
  switch (action.type) {
    case CONFIRMATION_QUEUE_GET: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: [],
        loading: true,
        error: null,
      };
    
      return Immutable.Map(currentState);
    }

    case CONFIRMATION_QUEUE_GET_SUCCEEDED: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: action.data,
        error: null,
      };
    
      return Immutable.Map(currentState);
    }

    case CONFIRMATION_QUEUE_ADD_SUCCEEDED: {
      const currentState = state.toJS();
    
      currentState[action.node.meta.id].items.push(action.bloj);
        
      return Immutable.Map(currentState);
    }

    case CONFIRMATION_QUEUE_REMOVE_SUCCEEDED: {
      const currentState = state.toJS();
      const foundIndex = currentState[action.node.meta.id].items.findIndex(c => c.id === action.bloj.id);
    
      currentState[action.node.meta.id].items.splice(foundIndex, 1);
        
      return Immutable.Map(currentState);
    }

    case CONFIRMATION_QUEUE_GET_FAILED:
    case CONFIRMATION_QUEUE_ADD_FAILED:
    case CONFIRMATION_QUEUE_REMOVE_FAILED: {
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