/**
 * @module store
 */

import {
  createAction,
  createReducer,
  configureStore,
} from '@reduxjs/toolkit';
import { initialState, error, loading, summaryLoaded } from './reducer';
import thunkMiddleware from 'redux-thunk';
import {SummaryObject} from './reducer'; 

enum ActionType {
  ERROR = 'error',
  LOADING = 'loading',
  SUMMARY = 'summaryLoaded',
}

export const errorAction = createAction<string>('error');
export const loadingAction = createAction('loading');
export const summaryLoadedAction = createAction<SummaryObject>('summaryLoaded');

const reducer = createReducer(initialState, {
  [ActionType.ERROR]: error,
  [ActionType.LOADING]: loading,
  [ActionType.SUMMARY]: summaryLoaded,
});

export const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware],
});