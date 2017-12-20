import Immutable from 'immutable';
import { BLOJS_GET_SUCCEEDED, BLOJS_GET_FAILED, BLOJS_CREATE_SUCCEEDED, BLOJS_CREATE_FAILED , BLOJS_ADD_SUCCEEDED, BLOJS_ADD_FAILED, BLOJS_UPDATE_SUCCEEDED, BLOJS_UPDATE_FAILED } from '../actions/blojs';

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

    case BLOJS_UPDATE_SUCCEEDED: {
      const currentState = state.toJS();
      const items = currentState[action.node.meta.id].items;
      const foundIndex = items.findIndex(item => item.id === action.data.id);

      if (foundIndex !== -1) {
        items[foundIndex] = action.data;
      }

      currentState[action.node.meta.id].items = items;
          
      return Immutable.Map(currentState);
    }

    case BLOJS_GET_FAILED:
    case BLOJS_CREATE_FAILED:
    case BLOJS_ADD_FAILED:
    case BLOJS_UPDATE_FAILED: {
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