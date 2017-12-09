import { all } from 'redux-saga/effects';
import { getNodes } from './nodes';
import { getBlojs } from './blojs';

export default function* () {
  yield all([
    getNodes(),
    getBlojs(),
  ]);
}