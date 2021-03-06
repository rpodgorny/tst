import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import configReducer from './modules/config';
import globalReducer from './modules/global';

/*
ph: moc nerozumím konstantám CONFIG a GLOBAL, obvykle se to dělá takto:

 import config from './modules/config';
 import global from './modules/global';

 const createRootReducer = () => {
   return combineReducers({
     config,
     global,
     ...dynamicReducers
   });
 };
 */
export const CONFIG = 'config';
export const GLOBAL = 'global';

const dynamicReducers = [];

const createRootReducer = () => {
  return combineReducers({
    [CONFIG]: configReducer,
    [GLOBAL]: globalReducer,
    ...dynamicReducers
  });
};

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(createRootReducer(), composeEnhancers(applyMiddleware(sagaMiddleware)));

export const injectReducer = ({ key, reducer }) => {
  if (dynamicReducers[key]) return; // already injected
  dynamicReducers[key] = reducer;
  store.replaceReducer(createRootReducer());
};

export const injectSagas = (sagas) => {
  sagaMiddleware.run(function* () {
    yield all([
      ...sagas
    ].map(saga => saga()));
  });
};

export const state = (key) => store.getState()[key];
