import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'primereact/chart';
import 'bootstrap/dist/css/bootstrap.css';

/*
 * Make sure to import the ShiftJS macro before importing any backend
 * functions.
 */
import '@binaris/shift-babel-macro/macro';

/*
 * We can import backend functions into our code and call them like any
 * regular function. The only thing to note is that instead of returning
 * a value directly, these functions return a Promise() to the return value,
 * so make sure to use .then() or await to get the actual response.
 */
import {
  generateRemoteData,
  setStorageData,
  getStorageData,
} from '../backend/backend.js';

import './index.css';

const chart_data = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'My First dataset',
      data: [150, 50, 100],
      backgroundColor: ['#FF6384', '#42A5F5', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#42A5F5', '#FFCE56'],
    },
  ],
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chart_data: chart_data };
    this.generateLocalData = this.generateLocalData.bind(this);
    this.getRemoteData = this.getRemoteData.bind(this);
    this.fetchFromStorageData = this.fetchFromStorageData.bind(this);
    this.initStorageData();
  }

  initStorageData() {
    setStorageData(this.state.chart_data.datasets[0].data);
  }

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <h1>Dashboard Template</h1>
        </div>
        <div className='row' style={{ marginBottom: 100 }}>
          <div className='col-12'>
            <button
              type='button'
              onClick={this.generateLocalData}
              className='btn btn-primary btn-sm'
            >
              Generate data in frontend
            </button>

            <button
              type='button'
              onClick={this.getRemoteData}
              className='btn btn-primary btn-sm'
              style={{ margin: 10 }}
            >
              Generate data in backend
            </button>

            <button
              type='button'
              onClick={this.fetchFromStorageData}
              className='btn btn-primary btn-sm'
            >
              Fetch data from database
            </button>
          </div>
        </div>
        <div className='row' style={{ marginBottom: 100 }}>
          <div className='col-4'>
            <Chart type='doughnut' data={this.state.chart_data} />
          </div>
          <div className='col-4'>
            <Chart type='pie' data={this.state.chart_data} />
          </div>
          <div className='col-4'>
            <Chart type='bar' data={this.state.chart_data} />
          </div>
        </div>

        <div className='row'>
          <div className='col-4'>
            <Chart type='line' data={this.state.chart_data} />
          </div>
          <div className='col-4'>
            <Chart type='polarArea' data={this.state.chart_data} />
          </div>
          <div className='col-4'>
            <Chart type='horizontalBar' data={this.state.chart_data} />
          </div>
        </div>
      </div>
    );
  }

  generateLocalData() {
    const newdata = Object.assign({}, this.state.chart_data);
    newdata.datasets[0].data = [
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100 + 1),
    ];
    this.setState({ chart_data: newdata });
  }

  async getRemoteData() {
    const newdata = Object.assign({}, this.state.chart_data);
    newdata.datasets[0].data = await generateRemoteData();
    this.setState({ chart_data: newdata });
  }

  async fetchFromStorageData() {
    const newdata = Object.assign({}, this.state.chart_data);
    newdata.datasets[0].data = await getStorageData();
    this.setState({ chart_data: newdata });
  }
}

ReactDOM.render(<Dashboard />, document.getElementById('root'));
