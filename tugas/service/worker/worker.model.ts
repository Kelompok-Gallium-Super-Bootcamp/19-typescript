/** @module WorkerModel */
import { EntitySchema } from 'typeorm';

export interface DataWorker{
  id: number,
  name: string,
  age: string,
  bio: string,
  address: string,
  photo: string
}

/**
 * worker model
 */
export class Worker {
  public id: number;
  public name: string;
  public age: string;
  public bio: string;
  public address: string;
  public photo: string;
  /**
   * create new instance of worker model
   * @param {number} id id of a worker
   * @param {string} name name worker
   * @param {string} age age worker
   * @param {string} bio bio worker
   * @param {string} address address worker
   * @param {string} photo name file photo worker
   */
  constructor(
    id: number,
    name: string,
    age: number,
    bio: string,
    address: string,
    photo: string
    ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.bio = bio;
    this.address = address;
    this.photo = photo;
  }
}

/**
 * entry schema of worker model
 */
export const WorkerSchema = new EntitySchema<DataWorker>({
  name: 'Worker',
  target: Worker,
  tableName: 'workers',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    age: {
      type: 'int',
    },
    bio: {
      type: 'text',
    },
    address: {
      type: 'text',
    },
    photo: {
      type: 'varchar',
      length: 255,
    },
  },
});
