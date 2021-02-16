/**@module async-action-worker */

import { DataWorker } from './reducer';
import {
  loadingAction,
  errorAction,
  registeredAction,
  removedAction,
  workersLoadedAction,
} from './store';
import * as workerSvc from './worker.client';

/**
 * memasukkan data pekerja
 * @function
 * @param {WorkerData} data 
 */
export const register = (data: DataWorker) => async (dispatch: any) => {
  dispatch(loadingAction());
  try {
    const worker = await workerSvc.register(data);
    dispatch(registeredAction(worker));
  } catch (err) {
    dispatch(errorAction(`gagal mendaftarkan ${data.name}`));
  }
};

/**
 * menghapus data pekerja dengan id tertentu
 * @function
 * @param {number} id
 */
export const remove = (id: number) => async (dispatch: any) => {
  dispatch(loadingAction());
  try {
    await workerSvc.remove(id);
    dispatch(removedAction(id));
  } catch (err) {
    dispatch(errorAction('gagal menghapus pekerja'));
  }
};

/**
 * memuat semua data pekerja
 * @function 
 */
export const getList = async (dispatch: any) => {
  dispatch(loadingAction());
  try {
    const workers = await workerSvc.list();
    dispatch(workersLoadedAction(workers));
  } catch (err) {
    dispatch(errorAction('gagal memuat daftar pekerja'));
  }
};
