import { SERVICE_BASEURL } from './config';

export interface Worker {
  assigneed : number ;
  name : string;
  age : number;
  bio : string;
  address : string ;
  photo : string;
}

export interface Task {
  id: number;
  job: string;
  assignee: Worker;
  done: boolean;
  cancelled: boolean;
  attachment: string;
  addedAt: string;
}

export interface TaskState {
  id: number;
  job: string;
  assignee:string;
  done: boolean;  
  attachment: string;
}


export interface State {
  loading: boolean;
  error : string | null;
  workers : Worker[];
  tasks : TaskState[];
}

export interface Action {
  type: string;
  payload : Task;
}

// setup state
export const initialState = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
};

export function loading(state : State) {
  state.loading = true;
  state.error = null;
}

export function error(state :State,  action) {
  state.loading = false;
  state.error = action.payload;
}

/**
 * mengubah state error menjadu null
 * @function
 * @param {Object} state 
 */
export function clearError(state) {
  state.error = null;
}

/**@module reducer-tasks */

/**
 * menambahkan item pada state
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {state}
 */
export function added(state :State,  action : Action) {
  const task = action.payload;
  state.tasks.push({
    id: task.id,
    job: task.job,
    assignee: task.assignee.name,
    attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
    done: false,
  });
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * mengubah status done pada task tertentu menjadi true
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
 */
export function done(state :State,  action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * mengubah status cancel pada task tertentu menjadi true
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
 */
export function canceled(state :State,  action) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * me-load semua task yang ada pada db
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
 */
export function tasksLoaded(state :State,  action) {
  state.tasks = action.payload
    .filter((t) => !t.cancelled)
    .map((task) => ({
      id: task.id,
      job: task.job,
      assignee: task.assignee.name,
      attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
      done: task.done,
    }));
  state.loading = false;
  state.error = null;
  return state;
}

/**
 * me-load semua worker yang ada pada db
 * @function
 * @param {Object} state 
 * @param {function} action 
 * @returns {Object}
 */
export function workersLoaded(state :State,  action) {
  state.workers = action.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
  }));
  state.loading = false;
  state.error = null;
  return state;
}
