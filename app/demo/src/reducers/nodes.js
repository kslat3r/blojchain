import Immutable from 'immutable';
import { NODES_GET_SUCCEEDED, NODES_GET_FAILED } from '../actions/nodes';

const initialState = Immutable.Map({
  items: [],
  error: null,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case NODES_GET_SUCCEEDED:
      return Immutable.Map({
        items: action.data,
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