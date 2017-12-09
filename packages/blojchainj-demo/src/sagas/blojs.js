import { takeEvery, call, put } from 'redux-saga/effects';
import { BLOJS_GET, BLOJS_GET_SUCCEEDED, BLOJS_GET_FAILED } from '../actions/blojs';
import * as blojsService from '../services/blojs';

export function* getBlojs() {
  yield takeEvery(BLOJS_GET, function* (action) {
    try {
      const data = yield call(blojsService.get, action.node);

      yield put({
        type: BLOJS_GET_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: BLOJS_GET_FAILED,
        node: action.node,
        error,
      });
    }
  });
}