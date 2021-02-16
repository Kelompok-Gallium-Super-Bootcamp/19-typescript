/** @module LibraryKv */

import * as redis from 'redis';
import { promisify } from 'util';

let client;

interface OptionsKv {
  port?: number;
  database?: string;
}

/**
 * function connect
 * @param {Object} options config for connect kv
 * @returns {Promse<Client>}
 */
export function connect(options : OptionsKv) {
  return new Promise((resolve, reject) =>  {
    client = redis.createClient(options);
    client.on('connect', () => {
      resolve('')  ;
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * function save kv
 * @param {object} db config database kv
 * @param {object} data data object
 * @returns {Promise<Save>} save data to kv
 */
export function save(db : string, data: any) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

/**
 * function read data kv
 * @param {object} db data object
 * @returns {JSON} Json parse data
 */
export async function read(db:string) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

/**
 * function drop data kv
 * @param {object} db data object
 */
export function drop(db:string) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

/**
 * function disconnect kv
 * @function close close connection kv
 */
export function close() {
  if (!client) {
    return;
  }
  if (client.connected) {
    client.end(true);
  }
}
