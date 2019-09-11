import '@binaris/shift-code-transform/macro';
import React from 'react';
import { Chart } from 'primereact/chart';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import {
  generateRemoteData,
  initData,
  getStoredData,
} from '../../backend/dashboard-server';
import { Display } from '../constants/enums';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            label: 'My First dataset',
            data: [100, 200, 300],
            backgroundColor: ['#FF6384', '#13bdd8', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#13bdd8', '#FFCE56'],
          },
        ],
      },
      display: Display.FRONTEND,
    };
    this.generateLocalData = this.generateLocalData.bind(this);
    this.getRemoteData = this.getRemoteData.bind(this);
    this.fetchStoredData = this.fetchStoredData.bind(this);
  }

  componentDidMount() {
    try {
      initData(this.state.chartData.datasets[0].data);
    } catch (err) {
      console.log('Error initializing data to DB');
    }
  }

  render() {
    const showError =
      this.state.display === Display.ERROR ? 'visible' : 'invisible';
    const showLoading =
      this.state.display === Display.LOADING ? 'visible' : 'invisible';
    const showDashboard =
      this.state.display === Display.LOADING ||
      this.state.display === Display.ERROR
        ? 'none'
        : 'block';
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
            onClick={this.fetchStoredData}
            style={{ margin: 10 }}
            active={this.state.display === Display.DB}
          >
            Fetch data from database
          </Button>
        </Row>
        <Container style={{ display: showDashboard }}>
          <Row style={{ marginBottom: 100 }}>
            <Col className='col-4'>
              <Chart type='doughnut' data={this.state.chartData} />
            </Col>
            <Col className='col-4'>
              <Chart type='pie' data={this.state.chartData} />
            </Col>
            <Col className='col-4'>
              <Chart type='bar' data={this.state.chartData} />
            </Col>
          </Row>
          <Row>
            <Col className='col-4'>
              <Chart type='line' data={this.state.chartData} />
            </Col>
            <Col className='col-4'>
              <Chart type='polarArea' data={this.state.chartData} />
            </Col>
            <Col className='col-4'>
              <Chart type='horizontalBar' data={this.state.chartData} />
            </Col>
          </Row>
        </Container>
        <Container className={showError}>
          <Alert variant='danger'>Oh snap! You got an error!</Alert>
        </Container>
        <Container fluid className={showLoading}>
          <Spinner animation='border' variant='info' className='mr-2' />
          <span className='pl-1'>Loading...</span>
        </Container>
      </Container>
    );
  }

  /** Generate random chart data */
  generateLocalData() {
    this.setState({ display: Display.LOADING });
    const randomData = [
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100 + 1),
    ];
    const newData = {
      ...this.state.chartData,
      datasets: [{ ...this.state.chartData.datasets[0], data: randomData }],
    };

    this.setState({ display: Display.FRONTEND });
    this.setState({ chartData: newData });
  }

  /** Generate random chart data from backend*/
  async getRemoteData() {
    try {
      this.setState({ display: Display.LOADING });
      const serverData = await generateRemoteData();
      const newData = {
        ...this.state.chartData,
        datasets: [{ ...this.state.chartData.datasets[0], data: serverData }],
      };

      this.setState({ display: Display.BACKEND });
      this.setState({ chartData: newData });
    } catch (err) {
      this.setState({ display: Display.ERROR });
    }
  }

  /** Fetch random chart data from db*/
  async fetchStoredData() {
    try {
      this.setState({ display: Display.LOADING });
      const storedData = await getStoredData();
      const newData = {
        ...this.state.chartData,
        datasets: [{ ...this.state.chartData.datasets[0], data: storedData }],
      };
      this.setState({ display: Display.DB });
      this.setState({ chartData: newData });
    } catch (err) {
      this.setState({ display: Display.ERROR });
    }
  }
}
