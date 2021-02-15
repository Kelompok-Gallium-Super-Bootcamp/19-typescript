/**
 * @module task-worker-client
 */
import { client } from '../lib/http-client';

import { WORKER_SERVICE_BASEURL } from './config';

/**
 * list all workers
 * @function
 */
function list() {
  return client.get(`${WORKER_SERVICE_BASEURL}/list`);
}

module.exports = {
  list,
};
