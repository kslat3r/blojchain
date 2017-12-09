import Immutable from 'immutable';
import { NODES_GET_SUCCEEDED, NODES_GET_FAILED } from '../actions/nodes';

const initialState = Immutable.Map({
  items: [{
    meta: {
      id: 'seed',
      serverHost: process.env.REACT_APP_SEED_HOST,
      serverPort: process.env.REACT_APP_SEED_PORT,
    },
  }],
  error: null,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case NODES_GET_SUCCEEDED:
      return Immutable.Map({
        items: state.toJS().items.concat(action.data),
        error: null,
      });

    case NODES_GET_FAILED:
      return Immutable.Map({
        items: [],
        error: action.error,
      });

    default:
      return state;
  }
}