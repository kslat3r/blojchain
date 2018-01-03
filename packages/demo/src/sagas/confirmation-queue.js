import { takeEvery, call, put } from 'redux-saga/effects';
import { CONFIRMATION_QUEUE_GET, CONFIRMATION_QUEUE_GET_SUCCEEDED, CONFIRMATION_QUEUE_GET_FAILED, CONFIRMATION_QUEUE_ADD, CONFIRMATION_QUEUE_ADD_SUCCEEDED, CONFIRMATION_QUEUE_ADD_FAILED, CONFIRMATION_QUEUE_REMOVE, CONFIRMATION_QUEUE_REMOVE_SUCCEEDED, CONFIRMATION_QUEUE_REMOVE_FAILED } from '../actions/confirmation-queue';
import * as confirmationQueueService from '../services/confirmation-queue';

export function* getConfirmationQueue() {
  yield takeEvery(CONFIRMATION_QUEUE_GET, function* (action) {
    try {
      const data = yield call(confirmationQueueService.get, action.node);

      yield put({
        type: CONFIRMATION_QUEUE_GET_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: CONFIRMATION_QUEUE_GET_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* addBlojToConfirmationQueue() {
  yield takeEvery(CONFIRMATION_QUEUE_ADD, function* (action) {
    try {
      yield put({
        type: CONFIRMATION_QUEUE_ADD_SUCCEEDED,
        node: action.node,
        bloj: action.bloj,
      })
    } catch (error) {
      yield put({
        type: CONFIRMATION_QUEUE_ADD_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* removeBlojFromConfirmationQueue() {
  yield takeEvery(CONFIRMATION_QUEUE_REMOVE, function* (action) {
    try {
      yield put({
        type: CONFIRMATION_QUEUE_REMOVE_SUCCEEDED,
        node: action.node,
        bloj: action.bloj,
      })
    } catch (error) {
      yield put({
        type: CONFIRMATION_QUEUE_REMOVE_FAILED,
        node: action.node,
        error,
      });
    }
  });
}