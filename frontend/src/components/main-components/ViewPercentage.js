import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';

class ViewPercentage extends Component {
  render() {
    return (
      <Container>
        <div style={{ height: '100px' }} />
        <h1>View Percentage</h1>
        <p>
          <b>
            Topic Name(POST TITLE) Ex. 1. หนังสือหุ้น เล่มนี้security analysis
            ต้องเสียภาษีนำเข้าไหม
          </b>
        </p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>User ID</th>
              <th>Post Date</th>
              <th>Comment</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>สมาชิกหมายเลข 1234567</td>
              <td>07/23/2019 23:11:14</td>
              <td>ก็ไม่รู้สินะะะะ อุอิ</td>
              <td>23%</td>
            </tr>
            <tr>
              <td>2</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>3</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}
export default ViewPercentage;
