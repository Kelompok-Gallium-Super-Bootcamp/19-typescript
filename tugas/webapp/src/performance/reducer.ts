// setup state

export interface SummaryObject {
  total_task: number;
  task_done: number;
  task_cancelled: number;
	total_worker: number;
}

interface ActionObject {
  type: string;
}

interface ActionObjectErr extends ActionObject {
  payload: string;
}

interface ActionObjectSum extends ActionObject {
  payload: SummaryObject;
}

export interface StateObject {
	loading: boolean;
	error: string;
  summary: SummaryObject;
}

export const initialState: StateObject = {
  loading: false,
  error: null,
  summary: {
    total_task: 0,
    task_done: 0,
    task_cancelled: 0,
    total_worker: 0,
  },
};

/**
 * funsi untuk mengelola state loading
 * @function
 * @param {StateObject} state
 * @return {StateObject} state
 */
export function loading(state: StateObject): StateObject {
  state.loading = true;
  state.error = null;
	return state;
}

/**
 * funsi untuk mengelola state error
 * @function
 * @param {StateObject} state
 * @param {ActionObjectErr} action
 * @return {StateObject} state
 */
export function error(state: StateObject, action:ActionObjectErr): StateObject {
  state.loading = false;
  state.error = action?.payload;
	return state;
}


/**@module reducer-performance  */

/**
 * funsi untuk memngeluarkan summary
 * @function
 * @param {StateObject} state
 * @param {ActionObjectSum} action
 * @return {StateObject} state
 */
export function summaryLoaded(state: StateObject, action: ActionObjectSum): StateObject {
  state.summary = action?.payload;
  state.loading = false;
  state.error = null;
  return state;
}

