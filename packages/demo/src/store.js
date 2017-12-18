import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import sagas from './sagas';

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);

  return store;
}
