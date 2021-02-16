import { createConnection } from 'typeorm';

export function connect(entities, config) {
  return createConnection({
    ...config,
    synchronize: true,
    timezone: 'Asia/Jakarta',
    entities,
  });
}