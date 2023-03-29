import pgp from 'pg-promise';
import { dbConfig } from './db-config.js';
import { pgPromiseConfig } from './pg-promise-config.js';

export const pgPromise = pgp(pgPromiseConfig);
export const db = pgPromise(dbConfig);

