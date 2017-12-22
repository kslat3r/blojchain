import Immutable from 'immutable';
import { LOGS_GET_SUCCEEDED, LOGS_GET_FAILED, LOGS_ADD_SUCCEEDED, LOGS_ADD_FAILED } from '../actions/logs';

const initialState = Immutable.Map({
  items: [],
  error: null,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGS_GET_SUCCEEDED: {
      console.log(action.data);

      const currentState = state.toJS();

      const logs = action.data
        .map((log) => {
          log.node = action.node;
          
          return log;
        });

      currentState.items = currentState.items
        .concat(logs)
        .sort((a, b) => a.timestamp - b.timestamp);
    
      return Immutable.Map(currentState);
    }

    case LOGS_ADD_SUCCEEDED: {
      const currentState = state.toJS();
      
      currentState.items.push(Object.assign({}, action.log, { node: action.node }));
      currentState.items = currentState.items.sort((a, b) => a.timestamp - b.timestamp);
          
      return Immutable.Map(currentState);
    }
    
    case LOGS_ADD_FAILED:
    case LOGS_GET_FAILED: {
      return Immutable.Map({
        items: [],
        error: action.error,
      });
    }

    default:
      return state;
  }
}