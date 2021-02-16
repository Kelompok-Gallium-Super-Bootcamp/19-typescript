/**
 * @module worker-client
 */
import { client } from '../lib/http-client';

import { SERVICE_BASEURL } from './config';
import { DataWorker } from './reducer';

/**
 * fungsi register worker
 * @function
 * @param {WorkerData} data 
 */
export function register(data: DataWorker) {
  return client.post(`${SERVICE_BASEURL}/register`, data);
}

/**
 * fungsi list worker
 * @function 
 */
export function list() {
  return client.get(`${SERVICE_BASEURL}/list`);
}

/**
 * fungsi remove worker
 * @function 
 * @param {number} id
 */
export function remove(id: number) {
  return client.del(`${SERVICE_BASEURL}/remove?id=${id}`);
}

/**
 * fungsi untuk melihat informasi worker 
 * @function 
 * @param {number} id
 */
export function info(id: number) {
  return client.get(`${SERVICE_BASEURL}/info?id=${id}`);
}

