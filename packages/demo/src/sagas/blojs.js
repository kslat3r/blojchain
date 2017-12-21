import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { BLOJS_GET, BLOJS_GET_SUCCEEDED, BLOJS_GET_FAILED, BLOJS_CREATE, BLOJS_CREATE_SUCCEEDED, BLOJS_CREATE_FAILED, BLOJS_ADD, BLOJS_ADD_SUCCEEDED, BLOJS_ADD_FAILED, BLOJS_UPDATE, BLOJS_UPDATE_SUCCEEDED, BLOJS_UPDATE_FAILED } from '../actions/blojs';
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

export function* createBloj() {
  yield takeLatest(BLOJS_CREATE, function* (action) {
    try {
      const data = yield call(blojsService.create, [action.bloj, action.node]);

      yield put({
        type: BLOJS_CREATE_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: BLOJS_CREATE_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* addBloj() {
  yield takeEvery(BLOJS_ADD, function* (action) {
    try {
      yield put({
        type: BLOJS_ADD_SUCCEEDED,
        node: action.node,
        data: action.bloj,
      })
    } catch (error) {
      yield put({
        type: BLOJS_ADD_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* updateBloj() {
  yield takeEvery(BLOJS_UPDATE, function* (action) {
    try {
      yield put({
        type: BLOJS_UPDATE_SUCCEEDED,
        node: action.node,
        data: action.bloj,
      })
    } catch (error) {
      yield put({
        type: BLOJS_UPDATE_FAILED,
        node: action.node,
        error,
      });
    }
  });
}