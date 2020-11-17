import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGS_GET, LOGS_GET_SUCCEEDED, LOGS_GET_FAILED, LOGS_ADD, LOGS_ADD_SUCCEEDED, LOGS_ADD_FAILED } from '../actions/logs';
import * as logsService from '../services/logs';

export function* getLogs() {
  yield takeEvery(LOGS_GET, function* (action) {
    try {
      const data = yield call(logsService.get, action.node);

      yield put({
        type: LOGS_GET_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: LOGS_GET_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* addLog() {
  yield takeEvery(LOGS_ADD, function* (action) {
    try {
      yield put({
        type: LOGS_ADD_SUCCEEDED,
        node: action.node,
        log: action.log,
      })
    } catch (error) {
      yield put({
        type: LOGS_ADD_FAILED,
        node: action.node,
        error,
      });
    }
  });
}