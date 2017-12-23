import { takeEvery, call, put } from 'redux-saga/effects';
import { CANDIDATES_GET, CANDIDATES_GET_SUCCEEDED, CANDIDATES_GET_FAILED, CANDIDATES_ADD, CANDIDATES_ADD_SUCCEEDED, CANDIDATES_ADD_FAILED, CANDIDATES_REMOVE, CANDIDATES_REMOVE_SUCCEEDED, CANDIDATES_REMOVE_FAILED } from '../actions/candidates';
import * as candidatesService from '../services/candidates';

export function* getCandidates() {
  yield takeEvery(CANDIDATES_GET, function* (action) {
    try {
      const data = yield call(candidatesService.get, action.node);

      yield put({
        type: CANDIDATES_GET_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: CANDIDATES_GET_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* addCandidate() {
  yield takeEvery(CANDIDATES_ADD, function* (action) {
    try {
      yield put({
        type: CANDIDATES_ADD_SUCCEEDED,
        node: action.node,
        candidate: action.candidate,
      })
    } catch (error) {
      yield put({
        type: CANDIDATES_ADD_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* removeCandidate() {
  yield takeEvery(CANDIDATES_REMOVE, function* (action) {
    try {
      yield put({
        type: CANDIDATES_REMOVE_SUCCEEDED,
        node: action.node,
        candidate: action.candidate,
      })
    } catch (error) {
      yield put({
        type: CANDIDATES_REMOVE_FAILED,
        node: action.node,
        error,
      });
    }
  });
}