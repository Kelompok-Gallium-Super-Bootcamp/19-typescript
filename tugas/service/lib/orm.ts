import  { ConnectionOptions, createConnection, EntitySchema } from 'typeorm';

/**
 * connect to database
 * @deprecated
 * @param {EntitySchema[]} entities model entitites schemas
 * @param {*} config additional [`typeorm`](https://typeorm.io) connection config
 * 
 */

export function connect(entities: EntitySchema[], config: ConnectionOptions) {
  return createConnection({
    ...config,
    synchronize: true,
    entities,
  });
}
