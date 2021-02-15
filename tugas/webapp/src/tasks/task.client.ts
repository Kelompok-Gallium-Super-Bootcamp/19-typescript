/**
 * @module task-client
 */
import{ client } from '../lib/http-client';
import { SERVICE_BASEURL } from './config';


export interface TaskData {
  id: number;
  job: string;
  assignee: Worker;
  done: boolean;
  cancelled: boolean;
  attachment: string;
  addedAt : string;
}


/**
 * add task
 * @function
 * @param {TaskData} data 
 */
export function add(data : TaskData) {
  return client.post
  
  (`${SERVICE_BASEURL}/add`, data);
}

/**
 * list all tasks
 * @function 
 */
function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * cancel task with spesific id
 * @function
 * @param {number} id 
 */
function cancel(id) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * change done task status with spesific id
 * @function
 * @param {number} id 
 */
function done(id) {
  return client.put(`${SERVICE_BASEURL}/done?id=${id}`);
}

module.exports = {
  add,
  list,
  cancel,
  done,
};
