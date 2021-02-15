/** @module LibraryStorage */
import * as  mime from 'mime-types';
import  { Client } from 'minio';

export const ERROR_REQUIRE_OBJECT_NAME = 'error wajib memasukan nama objek';
export const ERROR_FILE_NOT_FOUND = 'error file tidak ditemukan';

export interface OptionStorage{
    endPoint: string;
    port: number;
    useSSL: boolean;
    accessKey: string;
    secretKey: string;
}

let client;
let bucketname : string;

/**
 * function connect storage
 * @param {string} _bucketname name path of storage
 * @param {object} options config storage
 * @returns close function
 * @throws {string} error if fail create new bucket name
 */
export async function connect(_bucketname : string, options : OptionStorage) {
  client = new Client({
    ...options,
    useSSL: false,
  });
  bucketname = _bucketname || 'photo';
  try {
    await client.makeBucket(bucketname);
  } catch (err) {
    if (err && err.code === 'BucketAlreadyOwnedByYou') {
      return;
    }
    throw err;
  }
}

/**
 * function random file name
 * @param {function} mimetype function mimetype
 * @returns {string} file name random
 */
function randomFileName(mimetype) {
  return (
    new Date().getTime() +
    '-' +
    Math.round(Math.random() * 1000) +
    '.' +
    mime.extension(mimetype)
  );
}

/**
 * function save file
 * @param {file} file data file
 * @param {function} mimetype function mimetype
 * @returns {Promise<File>} save file to storage bucket
 */
export function saveFile(file : string , mimetype : string ) {
  const objectName = randomFileName(mimetype);
  return new Promise((resolve, reject) => {
    client.putObject(bucketname, objectName, file, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(objectName);
    });
  });
}

/**
 * function read file
 * @param {string} objectName name of file object
 * @returns {file} file object
 * @throws {string} when objectName is null
 * @throws {string} when filename not found
 */
export async function readFile(objectName) {
  if (!objectName) {
    throw ERROR_REQUIRE_OBJECT_NAME;
  }
  try {
    await client.statObject(bucketname, objectName);
  } catch (err) {
    if (err && err.code === 'NotFound') {
      throw ERROR_FILE_NOT_FOUND;
    }
    throw err;
  }
  return client.getObject(bucketname, objectName);
}

