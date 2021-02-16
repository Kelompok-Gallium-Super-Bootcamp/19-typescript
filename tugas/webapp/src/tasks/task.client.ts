/**
 * @module task-client
 */
import{ client } from '../lib/http-client';
import { SERVICE_BASEURL } from './config';
import {TaskData} from '../../typing'


/**
 * add task
 * @function
 * @param {TaskData} data 
 */
export function add(data : TaskData)   {
  return client.post
  (`${SERVICE_BASEURL}/add`, data);
}

/**
 * list all tasks
 * @function 
 */
export function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * cancel task with spesific id
 * @function
 * @param {number} id 
 */
export function cancel(id:number) {
  return client.put(`${SERVICE_BASEURL}/cancel?id=${id}`);
}

/**
 * change done task status with spesific id
 * @function
 * @param {number} id 
 */
export function done(id:number) {
  return client.put(`${SERVICE_BASEURL}/done?id=${id}`);
}
