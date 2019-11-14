import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import ReactWordcloud from 'react-wordcloud';
import {
  Drawer,
  Grid,
  Row,
  Col,
  Tag,
  TagGroup,
  Input,
  IconButton,
  Icon
} from 'rsuite';
import _ from 'lodash';

const options = {
  maintainAspectRatio: true,
  responsive: true,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 15,
      fontSize: 16
    }
  },
  plugins: {
    labels: {
      render: 'percentage',
      fontColor: ['orange', 'gray', 'white'],
      fontSize: 12,
      precision: 2
    }
  }
};

class PostSummaryModal extends Component {
  constructor(props) {
    super(props);
    const { comments } = props;
    this.state = {
      total_comments: _.size(comments),
      approved: _.size(_.filter(comments, { status: 'old' })),
      pending: _.size(_.filter(comments, { status: 'pending' })),
      data: {
        labels: ['Negative', 'Neutral', 'Positive'],
        datasets: [
          {
            data: [
              _.size(_.filter(comments, { result: -1 })),
              _.size(_.filter(comments, { result: 0 })),
              _.size(_.filter(comments, { result: 1 }))
            ],
            backgroundColor: ['#FF0000', '#00FFFF', '#000080'],
            hoverBackgroundColor: ['#FF0000', '#00FFFF', '#000080']
          }
        ]
      },
      mockTags: _.split(props.post.post_tags, ','),
      typing: false,
      inputValue: ''
    };
    // Bind function
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }

  handleButtonClick() {
    this.setState(
      {
        typing: true
      },
      () => {
        this.input.focus();
      }
    );
  }
  handleInputChange(inputValue) {
    this.setState({ inputValue });
  }
  handleInputConfirm() {
    const { inputValue, mockTags } = this.state;
    const nextTags = inputValue ? _.union(mockTags, [inputValue]) : mockTags;
    this.setState({
      mockTags: nextTags,
      typing: false,
      inputValue: ''
    });
  }
  handleTagRemove(tag) {
    const { mockTags } = this.state;
    const nextTags = _.remove(mockTags, t => !_.isEqual(t, tag));
    this.setState({
      mockTags: nextTags
    });
  }

  renderInput() {
    const { typing, inputValue } = this.state;

    if (typing) {
      return (
        <Input
          inputRef={ref => {
            this.input = ref;
          }}
          size="xs"
          style={{ width: 70, display: 'inline-block', marginLeft: 10 }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      );
    }
    return (
      <IconButton
        style={{ display: 'inline-block', marginLeft: 10 }}
        onClick={this.handleButtonClick}
        icon={<Icon icon="plus" />}
        appearance="ghost"
        size="xs"
      />
    );
  }
  render() {
    const { wordData, handleClose, isVisible } = this.props;
    const { total_comments, pending, approved, data, mockTags } = this.state;
    return (
      <Drawer show={isVisible} onHide={handleClose} size="md">
        <Drawer.Header>
          <h1>Post Summary</h1>
        </Drawer.Header>
        <Drawer.Body>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <Jumbotron>
                  <Row>
                    <Col xs={16}>
                      <h4>Total Comment</h4>
                      <h5>Approved Comment</h5>
                      <h5>Pending Comment </h5>
                    </Col>
                    <Col xs={8}>
                      <h4 style={{ color: 'green' }}>{total_comments}</h4>
                      <h5 style={{ color: 'blue' }}>{approved}</h5>
                      <h5 style={{ color: 'orange' }}>{pending}</h5>
                    </Col>
                  </Row>
                </Jumbotron>
              </Col>
              <Col xs={12}>
                <div>
                  <Pie data={data} options={options} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Jumbotron>
                  <div style={{ paddingBottom: 10 }}>
                    <h3>Post Tags</h3>
                  </div>
                  <TagGroup>
                    {_.map(mockTags, (value, key) => {
                      return (
                        <Tag
                          key={key}
                          color="cyan"
                          closable
                          onClose={() => {
                            this.handleTagRemove(value);
                          }}
                        >
                          {value}
                        </Tag>
                      );
                    })}
                    {this.renderInput()}
                  </TagGroup>
                </Jumbotron>
              </Col>
              <Col xs={12}>
                <div>
                  <ReactWordcloud words={wordData} />
                </div>
              </Col>
            </Row>
          </Grid>
        </Drawer.Body>
        <Drawer.Footer></Drawer.Footer>
      </Drawer>
    );
  }
}

export default PostSummaryModal;
