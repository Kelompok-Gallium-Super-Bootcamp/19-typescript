import { SERVICE_BASEURL } from './config';

export interface DataWorker{
  id: number,
  name: string,
  age: string,
  bio: string,
  address: string,
  photo: string
}

export interface State{
  loading:boolean;
  error:any;
  workers:DataWorker[];
}

interface ActionObject {
  type: string;
}

interface ActionObjectError extends ActionObject{
  payload:any;
}

interface ActionObjectAdd extends ActionObject {
  payload: DataWorker;
}

interface ActionObjectDel extends ActionObject {
  payload: number;
}

interface ActionObjectList extends ActionObject {
  payload: DataWorker[];
}

// setup state
export const initialState = {
  loading: false,
  error: null,
  workers: [],
};

export function loading(state: State) {
  state.loading = true;
  state.error = null;
}

export function error(state: State, action: ActionObjectError ) {
  state.loading = false;
  state.error = action.payload;
}

export function clearError(state: State) {
  state.error = null;
}

/**@module reducer-workers */

/**
 * register worker
 * @function
 * @param {Object} state 
 * @param {function} action
 * @return {Object} state
 */
export function registered(state:State, action:ActionObjectAdd): State {
  const worker = action?.payload;
  state.workers.push({
    id: worker.id,
    name: worker.name,
    photo: `${SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  });
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * remove worker
 * @function
 * @param {Object} state 
 * @param {function} action
 * @return {Object} state
 */
export function removed(state: State, action: ActionObjectDel): State {
  const idx = state.workers.findIndex((t) => t.id === action?.payload);
  state.workers.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * load all workers
 * @function
 * @param {Object} state 
 * @param {function} action
 * @return {Object} state
 */
export function workersLoaded(state: State, action: ActionObjectList): State {
  state.workers = action?.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
    photo: `${SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  }));
  state.loading = false;
  state.error = null;
  return state;
}
