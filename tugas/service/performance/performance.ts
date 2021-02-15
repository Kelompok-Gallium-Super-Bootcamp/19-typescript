/** @module Performance */

import { read, save } from '../lib/kv';

const TASK_TOTAL_KEY = 'task.total';
const TASK_DONE_KEY = 'task.done';
const TASK_CANCELLED_KEY = 'task.cancelled';
const WORKER_TOTAL_KEY = 'worker.total';

export interface SummaryObject {
  total_task: number;
  task_done: number;
  task_cancelled: number;
	total_worker: number;
}
/**
 * get info summary
 * @returns {Promise<SummaryObject>}
 */
export async function summary():Promise<SummaryObject>  {
  const data = {
    total_task: parseInt((await read(TASK_TOTAL_KEY)) || '0', 10),
    task_done: parseInt((await read(TASK_DONE_KEY)) || '0', 10),
    task_cancelled: parseInt((await read(TASK_CANCELLED_KEY)) || '0', 10),
    total_worker: parseInt((await read(WORKER_TOTAL_KEY)) || '0', 10),
  };
  return data;
}

/**
 * increase total Task
 * @function increaseTotalTask
 */
export async function increaseTotalTask() {
  const raw = await read(TASK_TOTAL_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(TASK_TOTAL_KEY, val);
}

/**
 * increase done Task
 * @function increaseDoneTask
 */
export async function increaseDoneTask() {
  const raw = await read(TASK_DONE_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(TASK_DONE_KEY, val);
}

/**
 * increase Cancel Task
 * @function IncreaseCancelledTask
 */
export async function increaseCancelledTask() {
  const raw = await read(TASK_CANCELLED_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(TASK_CANCELLED_KEY, val);
}

/**
 * increase Total Worker
 * @function increaseTotalWorker
 */
export async function increaseTotalWorker() {
  const raw = await read(WORKER_TOTAL_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(WORKER_TOTAL_KEY, val);
}

/**
 * decrease Total Worker
 * @function decreaseTotalWorker
 */
export async function decreaseTotalWorker() {
  const raw = await read(WORKER_TOTAL_KEY);
  let val = parseInt(raw || '0', 10);
  if (val > 0) {
    val--;
  }
  await save(WORKER_TOTAL_KEY, val);
}