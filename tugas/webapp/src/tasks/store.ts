import {
  createAction,
  createReducer,
  configureStore,
} from  '@reduxjs/toolkit'
import {
  initialState,
  error,
  loading,
  added,
  canceled,
  done,
  tasksLoaded,
  workersLoaded,
  clearError,
} from  './reducer'
import thunkMiddleware from  'redux-thunk'
import {TaskState} from "./reducer";
enum ActionType {
ERROR = 'error',
LOADING = 'loading',
ADDED = 'added',
DONE  = 'done',
CANCELED = 'canceled',
TASK_LOADED = 'tasksLoaded',
WORKER_LOADED = 'workersLoaded',
CLEAR_ERROR = 'clearError'
}


const errorAction = createAction<TaskState>(ActionType.ERROR);
const loadingAction = createAction<TaskState>(ActionType.LOADING);
const addedAction = createAction<TaskState>(ActionType.ADDED);
const doneAction = createAction<TaskState>(ActionType.DONE);
const canceledAction = createAction<TaskState>(ActionType.CANCELED);
const tasksLoadedAction = createAction<TaskState>(ActionType.TASK_LOADED);
const workersLoadedAction = createAction<TaskState>(ActionType.WORKER_LOADED);
const clearErrorAction = createAction<TaskState>(ActionType.CLEAR_ERROR);




const reducer = createReducer(initialState, {
  [ActionType.ERROR]: error,
  [ActionType.LOADING]: clearError,
  [ActionType.ADDED]: loading,
  [ActionType.DONE]: done,
  [ActionType.CANCELED]: added,
  [ActionType.TASK_LOADED]: canceled,
  [ActionType.WORKER_LOADED]: workersLoaded,
  [ActionType.CLEAR_ERROR]: tasksLoaded,
});

const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware],
});

module.exports = {
  store$,
  errorAction,
  loadingAction,
  addedAction,
  doneAction,
  canceledAction,
  tasksLoadedAction,
  workersLoadedAction,
  clearErrorAction,
};
