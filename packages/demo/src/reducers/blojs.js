import Immutable from 'immutable';
import { BLOJS_GET_SUCCEEDED, BLOJS_GET_FAILED, BLOJS_CREATE_SUCCEEDED, BLOJS_CREATE_FAILED , BLOJS_ADD_SUCCEEDED, BLOJS_ADD_FAILED} from '../actions/blojs';

const initialState = Immutable.Map({});

export default function(state = initialState, action) {
  switch (action.type) {
    case BLOJS_GET_SUCCEEDED: {
      const currentState = state.toJS();

      currentState[action.node.meta.id] = {
        items: action.data,
        error: null,
      };
    
      return Immutable.Map(currentState);
    }

    case BLOJS_CREATE_SUCCEEDED:
      return state;

    case BLOJS_ADD_SUCCEEDED: {
      const currentState = state.toJS();
    
      currentState[action.node.meta.id].items.push(action.data);
        
      return Immutable.Map(currentState);
    }

    case BLOJS_GET_FAILED:
    case BLOJS_CREATE_FAILED:
    case BLOJS_ADD_FAILED: {
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