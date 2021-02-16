/** @module Worker */

import { getConnection } from 'typeorm';
import { DataWorker, Worker } from './worker.model';
import * as bus from '../lib/bus';

export const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
export const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

/**
 * add new Worker
 * @param {WorkerData} data worker detail
 * @returns {Promise<worker>} new worker detail with id
 * @throws {string} when data null
 */
export async function register(data: DataWorker): Promise<Worker> {
  if (!data.name || !data.age || !data.bio || !data.address || !data.photo) {
    throw ERROR_REGISTER_DATA_INVALID;
  }
  const workerRepo = getConnection().getRepository<Worker>('Worker');
  const worker = new Worker(
    null,
    data.name,
    parseInt(data.age, 10),
    data.bio,
    data.address,
    data.photo
  );
  await workerRepo.save(worker);
  bus.publish('worker.registered', worker);
  return worker;
}

/**
 * get list of worker
 * @return {Promise<Worker[]>} list of worker
 */
export function list(): Promise<Worker[]> {
  const workerRepo = getConnection().getRepository<Worker>('Worker');
  return workerRepo.find();
}

/**
 * get information of worker
 * @param {string} id worker id
 * @returns {Promise<Worker>} get info worker
 * @throws {string} when info worker not found in database
 */
export async function info(id: string): Promise<Worker> {
  const workerRepo = getConnection().getRepository<Worker>('Worker');
  const worker = await workerRepo.findOne(id);
  if (!worker) {
    throw ERROR_WORKER_NOT_FOUND;
  }
  return worker;
}

/**
 * remove a worker by id
 * @param {string} id worker id
 * @returns {Promise<Worker>} remove Worker
 * @throws {string} when worker not found in database
 */
export async function remove(id: string): Promise<Worker> {
  const workerRepo = getConnection().getRepository<Worker>('Worker');
  const worker = await workerRepo.findOne(id);
  if (!worker) {
    throw ERROR_WORKER_NOT_FOUND;
  }
  await workerRepo.delete(id);
  bus.publish('worker.removed', worker);
  return worker;
}

/**
 * truncate database
 * @returns {Promise<boolean>} boolean
 */
export async function truncate(): Promise<boolean> {
  const entities = getConnection().entityMetadatas;

  for (const entity of entities) {
    const repository = await getConnection().getRepository<Worker>(entity.name); // Get repository
    try {
      // change clear to delete for reference table issue

      await repository.delete({}); // Clear each entity table's content
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return true;
}

