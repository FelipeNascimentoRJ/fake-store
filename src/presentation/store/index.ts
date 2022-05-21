import {combineReducers, applyMiddleware, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';

// @ts-ignore
import applyAppStateListener from 'redux-enhancer-react-native-appstate';

import rootSagas from './sagas';
import rootReducers from './reducers';
import {ApplicationState} from './types';

import reactotron from '../config/reactotron';

const middlewareList = [];
const sagaMonitor = __DEV__ ? reactotron.createSagaMonitor?.() : undefined;

const onError = (error: Error): void => {
  const message = error.message || 'saga-root-error';
  console.log('CreateSagaMiddleware: ', message);
};

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
  onError,
});

middlewareList.push(sagaMiddleware);

const enhancers = [applyAppStateListener(), applyMiddleware(...middlewareList)];

if (__DEV__ && reactotron) {
  // @ts-ignore
  enhancers.push(reactotron.createEnhancer());
}

const reducer = combineReducers<ApplicationState>(rootReducers);

// @ts-ignore
const store: Store<ApplicationState> = configureStore({
  reducer,
  enhancers,
});

sagaMiddleware.run(rootSagas);

export * from './types';
export * from './selectors';

export default store;
