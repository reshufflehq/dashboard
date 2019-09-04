import { get, update } from '@binaris/shift-db';

/* @expose */
export async function generateRemoteData() {
  return [
    Math.floor(Math.random() * 100 + 1),
    Math.floor(Math.random() * 100 + 1),
    Math.floor(Math.random() * 100 + 1),
  ];
}

/* @expose */
export async function setStorageData(data) {
  return await update('chartData', (prevData = []) => data);
}

/* @expose */
export async function getStorageData() {
  return await get('chartData');
}
