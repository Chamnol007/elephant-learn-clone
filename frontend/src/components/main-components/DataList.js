import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import _ from 'lodash';
import './css/styles.css';
import Iframe from 'react-iframe';
import NavSide from '../sub-components/NavSide';
import {
  Container,
  Header,
  Content,
  Sidebar,
  Nav,
  Icon,
  Modal,
  Button,
  Row,
  Col,
  Grid,
  Notification
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostButtonPressed: true,
      active: 'post',
      isDeleting: false,
      postId: '',
      dataState: props.data
    };
  }

  _toggleButton(eventKey) {
    this.setState({
      isPostButtonPressed: !this.state.isPostButtonPressed,
      active: eventKey
    });
  }

  _handleExtendClick(postID, postDetail, comments) {
    this.props.loadDataAndGoToCommentPage(postID, postDetail, comments);
  }

  _deleteSavedPost(key) {
    this.setState({ postId: key });
    this.toggleDelete();
  }

  confirmDelete() {
    const { postId, dataState } = this.state;
    const deletedData = _.omit(dataState, postId);
    this.setState({ dataState: deletedData });
    this.open('warning', `Deleted post ${postId}`);
    this.toggleDelete();
  }

  open(funcName, message) {
    Notification[funcName]({
      title: _.upperFirst(funcName),
      description: (
        <div>
          <p>{message}</p>
        </div>
      )
    });
  }

  toggleDelete() {
    this.setState({ isDeleting: !this.state.isDeleting });
  }
  render() {
    const { isPostButtonPressed, active, isDeleting } = this.state;
    const { isNavSideExpand } = this.props;
    return (
      <div style={{ backgroundColor: 'white', width: '98%' }}>
        <Container>
          <Sidebar
            style={{ marginRight: 20 }}
            width={isNavSideExpand ? 220 : 56}
            collapsible
          >
            <NavSide />
            <Modal show={isDeleting} backdrop="static" size="xs">
              <Modal.Body>
                <Icon
                  icon="remind"
                  style={{
                    color: '#ffb300',
                    fontSize: 24
                  }}
                />
                <p>Are you sure you wish to delete this post?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={this.confirmDelete.bind(this)}
                  appearance="primary"
                >
                  Yes
                </Button>
                <Button
                  onClick={this.toggleDelete.bind(this)}
                  appearance="subtle"
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </Sidebar>
          <Container>
            <div
              className="d-flex flex-column"
              style={{
                paddingBottom: '20px'
              }}
            >
              <Header>
                <Nav
                  appearance="tabs"
                  justified
                  onSelect={this._toggleButton.bind(this)}
                  activeKey={active}
                >
                  <Nav.Item
                    eventKey="post"
                    icon={<Icon icon="list-alt" />}
                    style={{
                      justifyContent: 'flex-end',
                      display: 'flex'
                    }}
                  >
                    Post
                  </Nav.Item>
                  <Nav.Item
                    eventKey="statistic"
                    icon={<Icon icon="bar-chart" />}
                    style={{
                      justifyContent: 'flex-start',
                      display: 'flex'
                    }}
                  >
                    Statistic
                  </Nav.Item>
                </Nav>
              </Header>
            </div>
            <Content>
              {isPostButtonPressed ? (
                _.map(
                  _.chunk(_.values(this.state.dataState), 3),
                  (value, key) => {
                    return (
                      <Grid fluid key={key}>
                        <Row
                          style={{ paddingBottom: '10px' }}
                          className="show-grid"
                        >
                          {_.map(value, (val, k) => {
                            const {
                              postDetail,
                              day,
                              month,
                              time,
                              year,
                              postId,
                              comments
                            } = val;
                            const { id, post_story, post_title } = postDetail;
                            return (
                              <Col key={k} xs={8}>
                                <Card className="hover-button">
                                  <Card.Body>
                                    <Card.Title
                                      style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      {post_title}
                                    </Card.Title>
                                    <Card.Subtitle
                                      style={{ fontSize: '12px' }}
                                      className="mb-2 text-muted"
                                    >
                                      Last Saved:{' '}
                                      {`${day}/${month}/${year} ${time}`}
                                    </Card.Subtitle>
                                    <Card.Text
                                      onClick={() => {
                                        this._handleExtendClick(
                                          id,
                                          postDetail,
                                          comments
                                        );
                                      }}
                                    >
                                      {post_story}
                                    </Card.Text>
                                    <Card.Link
                                      className="hover-button--on"
                                      onClick={() => {
                                        window.open(
                                          `https://pantip.com/topic/${postId}`
                                        );
                                      }}
                                      style={{ color: 'blue' }}
                                    >
                                      Go To Post At Pantip
                                    </Card.Link>

                                    <Card.Link
                                      onClick={() => {
                                        this._deleteSavedPost(val.id);
                                      }}
                                      className="hover-button--on"
                                    >
                                      <MdDelete color="red" />
                                    </Card.Link>
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          })}
                        </Row>
                      </Grid>
                    );
                  }
                )
              ) : (
                <Row>
                  <Col>
                    <Card style={{ width: '33rem' }}>
                      <Iframe
                        url={
                          'https://firebasestorage.googleapis.com/v0/b/elephant-learn-test.appspot.com/o/statistic.html?alt=media&token=cb09906a-2bac-4cef-8edd-08635a355c7a'
                        }
                        id="myId"
                        height="200px"
                        className="myClassname"
                        display="initial"
                        position="relative"
                      />
                      <Card.Body>
                        <Card.Title>All Post Statistic</Card.Title>
                        <Card.Subtitle
                          style={{ fontSize: '12px' }}
                          className="mb-2 text-muted"
                        >
                          Last Saved: 28 Jul 2019, 16:08:31
                        </Card.Subtitle>
                        <Card.Text>
                          The statistic of 2000 posts in gap between 26 June to
                          22 July
                        </Card.Text>
                        <Button href="statistic" variant="primary">
                          Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </Content>
          </Container>
        </Container>
      </div>
    );
  }
}
export default DataList;
