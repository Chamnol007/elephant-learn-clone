import React, { Component } from 'react';
import NavSide from '../sub-components/NavSide';
import Jumbotron from 'react-bootstrap/Jumbotron';
import moment from 'moment';
import {
  Container,
  Sidebar,
  Content,
  Col,
  InputPicker,
  FlexboxGrid
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';

const date = moment();
const currentDate = date.format('DD/MM/YYYY');
const time = date.format('LTS');

const dateInterval = [
  {
    label: `Today ${currentDate}`,
    value: '1',
    role: '1'
  },
  {
    label: '7 days',
    value: '7',
    role: '2'
  },
  {
    label: '28 days',
    value: '28',
    role: '3'
  },
  {
    label: 'Current month',
    value: '2',
    role: '4'
  },
  {
    label: 'half year',
    value: '100',
    role: '5'
  }
];

const dayArray = (start, end, month) => {
  const days = [];
  const dayRange = _.reverse(_.range(start, end));
  _.forEach(dayRange, val => {
    const day = val > 9 ? val : `0${val}`;
    days.push(`0${month}/${day}/2019`);
  });
  return days;
};

class Statistic extends Component {
  constructor(props) {
    super(props);
  }

  handleDateSelect(value) {
    const val = _.toInteger(value);
    switch (val) {
      case 1:
        return this.props.getStatisticResult(['07/22/2019']);
      case 7:
        return this.props.getStatisticResult(dayArray(16, 23, 7));
      case 28:
        return this.props.getStatisticResult(
          _.union(dayArray(1, 23, 7), dayArray(1, 6, 6))
        );
      case 2:
        return this.props.getStatisticResult(dayArray(1, 23, 7));
      case 100:
        return this.props.getStatisticResult(
          _.union(dayArray(1, 23, 7), dayArray(1, 6, 6))
        );
    }
  }
  render() {
    const { isNavSideExpand, statistic } = this.props;
    const { comment, post } = statistic;

    const data = {
      labels: _.keys(post),
      datasets: [
        {
          label: 'Post',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(_.mapValues(post, 'number_post'))
        },
        {
          label: 'Comment',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'pink',
          borderColor: 'pink',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'pink',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'pink',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(_.mapValues(comment, 'number_comment'))
        }
      ]
    };
    return (
      <div style={{ backgroundColor: 'white' }}>
        <Container>
          <Sidebar width={isNavSideExpand ? 220 : 56} collapsible>
            <NavSide />
          </Sidebar>
          <Container>
            <Content>
              <div
                style={{
                  overflow: 'auto',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="show-grid" justify="space-around">
                  <div
                    style={{
                      alignSelf: 'center',
                      marginLeft: '92.5em',
                      marginRight: '2.5em',
                      marginBottom: '1em'
                    }}
                  >
                    <InputPicker
                      onSelect={this.handleDateSelect.bind(this)}
                      defaultValue={'1'}
                      active
                      block
                      cleanable={false}
                      preventOverflow
                      data={dateInterval}
                    />
                  </div>
                  <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} colSpan={24} md={8}>
                      <Jumbotron>
                        <h2>Total Post</h2>{' '}
                        <h3>
                          {_.sum(_.values(_.mapValues(post, 'number_post')))}
                        </h3>
                      </Jumbotron>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colSpan={24} md={8}>
                      <Jumbotron>
                        <h2>Total Comment</h2>{' '}
                        <h3>
                          {_.sum(
                            _.values(_.mapValues(comment, 'number_comment'))
                          )}
                        </h3>
                      </Jumbotron>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colSpan={24} md={8}>
                      <Jumbotron>
                        <h2>Average</h2>{' '}
                        <h3>
                          {(
                            _.sum(
                              _.values(_.mapValues(comment, 'number_comment'))
                            ) /
                            _.sum(_.values(_.mapValues(post, 'number_post')))
                          ).toFixed(2)}{' '}
                          comment/post
                        </h3>
                      </Jumbotron>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </div>
                <div className="show-grid" justify="space-around">
                  <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} colSpan={24} md={12}>
                      <Line data={data} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                      componentClass={Col}
                      colSpan={24}
                      md={4}
                    ></FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colSpan={24} md={8}>
                      <Jumbotron>
                        <h2>Total User</h2>{' '}
                        <h3>
                          {_.sum(
                            _.values(_.mapValues(comment, 'number_user'))
                          ) + _.sum(_.values(_.mapValues(post, 'number_user')))}
                        </h3>
                      </Jumbotron>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </div>
              </div>
            </Content>
          </Container>
        </Container>
      </div>
    );
  }
}
export default Statistic;
