import { takeEvery, call, put } from 'redux-saga/effects';
import { VERIFICATION_QUEUE_GET, VERIFICATION_QUEUE_GET_SUCCEEDED, VERIFICATION_QUEUE_GET_FAILED, VERIFICATION_QUEUE_ADD, VERIFICATION_QUEUE_ADD_SUCCEEDED, VERIFICATION_QUEUE_ADD_FAILED, VERIFICATION_QUEUE_REMOVE, VERIFICATION_QUEUE_REMOVE_SUCCEEDED, VERIFICATION_QUEUE_REMOVE_FAILED } from '../actions/verification-queue';
import * as verificationQueueService from '../services/verification-queue';

export function* getVerificationQueue() {
  yield takeEvery(VERIFICATION_QUEUE_GET, function* (action) {
    try {
      const data = yield call(verificationQueueService.get, action.node);

      yield put({
        type: VERIFICATION_QUEUE_GET_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: VERIFICATION_QUEUE_GET_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* addBlojToVerificationQueue() {
  yield takeEvery(VERIFICATION_QUEUE_ADD, function* (action) {
    try {
      yield put({
        type: VERIFICATION_QUEUE_ADD_SUCCEEDED,
        node: action.node,
        bloj: action.bloj,
      })
    } catch (error) {
      yield put({
        type: VERIFICATION_QUEUE_ADD_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* removeBlojFromVerificationQueue() {
  yield takeEvery(VERIFICATION_QUEUE_REMOVE, function* (action) {
    try {
      yield put({
        type: VERIFICATION_QUEUE_REMOVE_SUCCEEDED,
        node: action.node,
        bloj: action.bloj,
      })
    } catch (error) {
      yield put({
        type: VERIFICATION_QUEUE_REMOVE_FAILED,
        node: action.node,
        error,
      });
    }
  });
}