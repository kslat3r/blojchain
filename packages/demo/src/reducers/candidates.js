import Immutable from 'immutable';
import { CANDIDATES_GET_SUCCEEDED, CANDIDATES_GET_FAILED, CANDIDATES_ADD_SUCCEEDED, CANDIDATES_ADD_FAILED, CANDIDATES_REMOVE_SUCCEEDED, CANDIDATES_REMOVE_FAILED } from '../actions/candidates';

const initialState = Immutable.Map({});

export default function(state = initialState, action) {
  switch (action.type) {
    case CANDIDATES_GET_SUCCEEDED: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: action.data,
        error: null,
      };
    
      return Immutable.Map(currentState);
    }

    case CANDIDATES_ADD_SUCCEEDED: {
      const currentState = state.toJS();
    
      currentState[action.node.meta.id].items.push(action.candidate);
        
      return Immutable.Map(currentState);
    }

    case CANDIDATES_REMOVE_SUCCEEDED: {
      const currentState = state.toJS();
      const foundIndex = currentState[action.node.meta.id].items.findIndex(c => c.id === action.candidate.id);
    
      currentState[action.node.meta.id].items.splice(foundIndex, 1);
        
      return Immutable.Map(currentState);
    }

    case CANDIDATES_GET_FAILED:
    case CANDIDATES_ADD_FAILED:
    case CANDIDATES_REMOVE_FAILED: {
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