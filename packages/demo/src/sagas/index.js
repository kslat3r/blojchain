import { all } from 'redux-saga/effects';
import { getNodes } from './nodes';
import { getBlojs, createBloj, addBloj, updateBloj } from './blojs';
import { getLogs, addLog } from './logs';
import { getMiningQueue, addBlojToMiningQueue, removeBlojFromMiningQueue } from './mining-queue';
import { getVerificationQueue, addBlojToVerificationQueue, removeBlojFromVerificationQueue } from './verification-queue';
import { getConfirmationQueue, addBlojToConfirmationQueue, removeBlojFromConfirmationQueue } from './confirmation-queue';

export default function* () {
  yield all([
    getNodes(),
    getBlojs(),
    createBloj(),
    addBloj(),
    updateBloj(),
    getLogs(),
    addLog(),
    getMiningQueue(),
    addBlojToMiningQueue(),
    removeBlojFromMiningQueue(),
    getVerificationQueue(),
    addBlojToVerificationQueue(),
    removeBlojFromVerificationQueue(),
    getConfirmationQueue(),
    addBlojToConfirmationQueue(),
    removeBlojFromConfirmationQueue(),
  ]);
}