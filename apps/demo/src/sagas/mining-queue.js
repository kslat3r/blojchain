import { takeEvery, call, put } from 'redux-saga/effects';
import { MINING_QUEUE_GET, MINING_QUEUE_GET_SUCCEEDED, MINING_QUEUE_GET_FAILED, MINING_QUEUE_ADD, MINING_QUEUE_ADD_SUCCEEDED, MINING_QUEUE_ADD_FAILED, MINING_QUEUE_REMOVE, MINING_QUEUE_REMOVE_SUCCEEDED, MINING_QUEUE_REMOVE_FAILED } from '../actions/mining-queue';
import * as miningQueueService from '../services/mining-queue';

export function* getMiningQueue() {
  yield takeEvery(MINING_QUEUE_GET, function* (action) {
    try {
      const data = yield call(miningQueueService.get, action.node);

      yield put({
        type: MINING_QUEUE_GET_SUCCEEDED,
        node: action.node,
        data,
      })
    } catch (error) {
      yield put({
        type: MINING_QUEUE_GET_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* addBlojToMiningQueue() {
  yield takeEvery(MINING_QUEUE_ADD, function* (action) {
    try {
      yield put({
        type: MINING_QUEUE_ADD_SUCCEEDED,
        node: action.node,
        bloj: action.bloj,
      })
    } catch (error) {
      yield put({
        type: MINING_QUEUE_ADD_FAILED,
        node: action.node,
        error,
      });
    }
  });
}

export function* removeBlojFromMiningQueue() {
  yield takeEvery(MINING_QUEUE_REMOVE, function* (action) {
    try {
      yield put({
        type: MINING_QUEUE_REMOVE_SUCCEEDED,
        node: action.node,
        bloj: action.bloj,
      })
    } catch (error) {
      yield put({
        type: MINING_QUEUE_REMOVE_FAILED,
        node: action.node,
        error,
      });
    }
  });
}