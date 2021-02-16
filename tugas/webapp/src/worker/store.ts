import {
  createAction,
  createReducer,
  configureStore,
} from '@reduxjs/toolkit';
import {
  initialState,
  error,
  loading,
  registered,
  removed,
  workersLoaded,
  clearError,
} from './reducer';
import * as thunkMiddleware from 'redux-thunk';
import {DataWorker} from './reducer'

enum ActionType {
  ERROR = 'error',
  LOADING = 'loading',
  REGISTERED = 'registered',
  REMOVED = 'removed',
  WORKERS_LOADED = 'workersLoaded',
  CLEAR_ERROR = 'clearError',
}

export const errorAction = createAction<string>(ActionType.ERROR);
export const loadingAction = createAction(ActionType.LOADING);
export const registeredAction = createAction<DataWorker>(ActionType.REGISTERED);
export const removedAction = createAction<number>(ActionType.REMOVED);
export const workersLoadedAction = createAction<DataWorker[]>(ActionType.WORKERS_LOADED);
export const clearErrorAction = createAction(ActionType.CLEAR_ERROR);

const reducer = createReducer(initialState, {
  [ActionType.ERROR]: error,
  [ActionType.CLEAR_ERROR]: clearError,
  [ActionType.LOADING]: loading,
  [ActionType.REGISTERED]: registered,
  [ActionType.REMOVED]: removed,
  [ActionType.WORKERS_LOADED]: workersLoaded,
});

export const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware.default],
});
