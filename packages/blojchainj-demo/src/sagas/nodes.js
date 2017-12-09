import { takeLatest, call, put } from 'redux-saga/effects';
import { NODES_GET, NODES_GET_SUCCEEDED, NODES_GET_FAILED } from '../actions/nodes';
import * as nodesService from '../services/nodes';

export function* getNodes() {
  yield takeLatest(NODES_GET, function* (action) {
    try {
      const data = yield call(nodesService.get, action.seed);

      yield put({
        type: NODES_GET_SUCCEEDED,
        data,
      })
    } catch (error) {
      yield put({
        type: NODES_GET_FAILED,
        error,
      });
    }
  });
}