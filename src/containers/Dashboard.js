import React from 'react';
import { Chart } from 'primereact/chart';
import '@binaris/shift-babel-macro/macro';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import {
  generateRemoteData,
  setStorageData,
  getStorageData,
} from '../../backend/backend';
import { Display } from '../constants/enums';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart_data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            label: 'My First dataset',
            data: [150, 50, 100],
            backgroundColor: ['#FF6384', '#13bdd8', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#13bdd8', '#FFCE56'],
          },
        ],
      },
      display: Display.FRONTEND,
    };
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
      <Container>
        <Row className='justify-content-center mt-5'>
          <h1>Dashboard App</h1>
        </Row>
        <Row className='justify-content-center mb-5 mt-5'>
          <Button
            variant='info'
            size='sm'
            onClick={this.generateLocalData}
            style={{ margin: 10 }}
            active={this.state.display === Display.FRONTEND}
          >
            Generate data in frontend
          </Button>

          <Button
            variant='info'
            size='sm'
            onClick={this.getRemoteData}
            style={{ margin: 10 }}
            active={this.state.display === Display.BACKEND}
          >
            Generate data in backend
          </Button>

          <Button
            variant='info'
            size='sm'
            onClick={this.fetchFromStorageData}
            style={{ margin: 10 }}
            active={this.state.display === Display.DB}
          >
            Fetch data from database
          </Button>
        </Row>
        <Row style={{ marginBottom: 100 }}>
          <Col className='col-4'>
            <Chart type='doughnut' data={this.state.chart_data} />
          </Col>
          <Col className='col-4'>
            <Chart type='pie' data={this.state.chart_data} />
          </Col>
          <Col className='col-4'>
            <Chart type='bar' data={this.state.chart_data} />
          </Col>
        </Row>

        <Row>
          <Col className='col-4'>
            <Chart type='line' data={this.state.chart_data} />
          </Col>
          <Col className='col-4'>
            <Chart type='polarArea' data={this.state.chart_data} />
          </Col>
          <Col className='col-4'>
            <Chart type='horizontalBar' data={this.state.chart_data} />
          </Col>
        </Row>
      </Container>
    );
  }

  generateLocalData() {
    const newdata = Object.assign({}, this.state.chart_data);
    newdata.datasets[0].data = [
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100 + 1),
    ];
    this.setState({ display: Display.FRONTEND });
    this.setState({ chart_data: newdata });
  }

  async getRemoteData() {
    const newdata = Object.assign({}, this.state.chart_data);
    newdata.datasets[0].data = await generateRemoteData();
    this.setState({ display: Display.BACKEND });
    this.setState({ chart_data: newdata });
  }

  async fetchFromStorageData() {
    const newdata = Object.assign({}, this.state.chart_data);
    newdata.datasets[0].data = await getStorageData();
    this.setState({ display: Display.DB });
    this.setState({ chart_data: newdata });
  }
}
