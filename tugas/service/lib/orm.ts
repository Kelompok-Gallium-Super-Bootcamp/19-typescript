import { createConnection } from 'typeorm';

export interface Config {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}


export function connect(entities : Object, config : Config) {
  return createConnection({
    ...config,
    synchronize: true,
    timezone: 'Asia/Jakarta',
    entities,
  });
}