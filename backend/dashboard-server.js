import { get, create } from '@binaris/shift-db';
/*
  Generate random chart data
 */
/* @expose */
export async function generateRemoteData() {
  return [
    Math.floor(Math.random() * 100 + 1),
    Math.floor(Math.random() * 100 + 1),
    Math.floor(Math.random() * 100 + 1),
  ];
}

/*
  Save chart data in db
 */
/* @expose */
export async function initData(data) {
  return create('chartData', data);
}

/*
  Fetch chart data from db
 */
/* @expose */
export async function getStoredData() {
  return get('chartData');
}
