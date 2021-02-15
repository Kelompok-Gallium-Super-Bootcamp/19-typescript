import { loadingAction, errorAction, summaryLoadedAction } from './store';
import perfSvc from './performance.client';

/**
 * @async
 * @method 
 * @param {Function} dispatch
 */
export const summary = async (dispatch: any) => {
  dispatch(loadingAction());
  try {
    const summary = await perfSvc.summary();
    dispatch(summaryLoadedAction(summary));
  } catch (err) {
    dispatch(errorAction('gagal memuat informasi kinerja'));
  }
};
