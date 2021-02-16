/** @module TaskModel */

import { EntitySchema } from 'typeorm';

export interface Worker {
  assigneed : number ;
  name : string;
  age : number;
  bio : string;
  address : string ;
  photo : string;
}

export interface TaskItems {
  id: number;
  job: string;
  assignee: Worker;
  done: boolean;
  cancelled: boolean;
  attachment: string;
  addedAt : string;
}

/**
 * Task Model
 */
export class Task {
  constructor(
    public id: number,
    public job: string,
    public assignee: object,
    public done: boolean,
    public cancelled: boolean,
    public attachment: string,
    private addedAt: string
  ) {
    this.id = id;
    this.job = job;
    this.done = done;
    this.cancelled = cancelled;
    this.addedAt = addedAt;
    this.attachment = attachment;
    this.assignee = assignee;
  }
}

/**
 * entry schema of Task model
 */
export const TaskSchema = new EntitySchema <TaskItems> ({
  name: 'Task',
  tableName: 'tasks',
  target: Task,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    job: {
      type: 'text',
    },
    done: {
      type: 'boolean',
      default: false,
    },
    cancelled: {
      type: 'boolean',
      default: false,
    },
    attachment: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    addedAt: {
      type: 'timestamp',
      name: 'added_at',
      nullable: false,
      default: () => 'NOW()',
    },
  },
  relations: {
    assignee: {
      target: 'Worker',
      type: 'many-to-one',
      onDelete: 'CASCADE',
    },
  },
});

