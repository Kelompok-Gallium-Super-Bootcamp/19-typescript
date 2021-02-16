import { client } from '../lib/http-client';

import { SERVICE_BASEURL } from './config';
import {SummaryObject} from './reducer';
/**
 * mengambil ringkasan kinerja
 * @returns {Promise<Task[]>} daftar pekerjaan
 */
export function summary(): Promise<SummaryObject> {
  return client.get(`${SERVICE_BASEURL}/summary`);
}