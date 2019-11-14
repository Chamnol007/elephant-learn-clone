import React, { Component } from 'react';
import { Container, Header, Content, Sidebar, Progress } from 'rsuite';
import Button from 'react-bootstrap/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './css/styles.css';
import { LOAD_PANDING_COMMENT_SPINNER } from '../../constants/Labels';
import Spinner from '../../utils/Spinner';
import PostSummaryModal from '../sub-components/PostSummaryModal';
import _ from 'lodash';
import NavSide from '../sub-components/NavSide';
import 'rsuite/dist/styles/rsuite-default.css';

class RetrievedComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postModalData: {},
      isPendingCommentPressed: false,
      isPostSummaryVisible: false
    };
  }

  componentDidMount() {
    const { getCommentArrayResult, comments } = this.props;
    getCommentArrayResult(comments);
  }

  loadPendingComment() {
    this.setState({
      isPendingCommentPressed: true
    });
    this.props.loadPendingCommentFromPost(this.props.currentPostID);
  }

  saveData() {
    const { comments, postDetail, openConfirmSaveModal } = this.props;
    const dataToSave = _.merge(comments, { postDetail: { ...postDetail } });
    openConfirmSaveModal({ data: dataToSave, type: 'post_edit' });
  }

  handleResult() {
    this.props.preprocessingComment({ post: { ...this.props.postDetail } });
  }

  loadPostSummary() {
    const { loadPostSummary, postDetail, comments } = this.props;
    loadPostSummary({ post: postDetail, comments: comments });
    this.setState({
      isPostSummaryVisible: true
    });
  }

  closePostSummaryModal() {
    this.setState({ isPostSummaryVisible: false });
  }

  _onDeleteRow(rowKeys, rows) {
    const { deleteComment, currentPostID } = this.props;
    _.forEach(rows, row => {
      deleteComment(currentPostID, row.id);
    });
  }

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: 'rgb(238, 193, 213)',
      onSelect: (row, isSelect, rowIndex, e) => {
        this.setState({
          postModalData: row
        });
      }
    };
    const defaultSorted = [
      {
        dataField: 'post_date',
        order: 'desc'
      }
    ];
    const buttonFormatter = (cell, row) => {
      if (!_.isNaN(row.result)) {
        switch (row.result) {
          case -1:
            return resultSpan('badge badge-danger', row);
          case 1:
            return resultSpan('badge badge-primary', row);
          case 0:
            return resultSpan('badge badge-info', row);
        }
      }
    };

    const buttonStatusFormatter = (cell, row) => {
      switch (row.status) {
        case 'old':
          return statusButton(row, 'badge badge-success', 'approved');
        case 'pending':
          return statusButton(row, 'badge badge-danger', 'pending');
      }
    };

    const resultSpan = (buttonClass, row) => {
      return (
        <div className="flex-direction-column">
          <span className={buttonClass} style={{ padding: '5px' }}>
            {row.result}
          </span>
          <div className="flex-direction-row">
            {_.map(row.playability, (value, key) => {
              const percent = _.toNumber(value) * 100;
              return (
                <div
                  key={key}
                  style={{
                    width: '100%',
                    paddingTop: 10,
                    fontSize: 10
                  }}
                >
                  <Progress.Line
                    percent={percent}
                    strokeWidth={4}
                    status={
                      _.isEqual(key, 'positive')
                        ? 'success'
                        : _.isEqual(key, 'negative')
                        ? 'fail'
                        : 'active'
                    }
                    showInfo={false}
                  />
                  {_.upperFirst(key)}: {percent && percent.toFixed(2)}%
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const statusButton = (row, buttonClass, content) => {
      return (
        <Button
          variant="link"
          onClick={() => {
            alert('Approve comment');
          }}
        >
          <h6>
            <span
              className={buttonClass}
              style={{ fontStyle: 'italic', padding: '5px' }}
            >
              {content}
            </span>
          </h6>
        </Button>
      );
    };
    const options = {
      afterDeleteRow: this._onDeleteRow.bind(this)
    };
    const {
      isSpinnerVisible,
      comments,
      postDetail,
      wordsCloud,
      isNavSideExpand
    } = this.props;
    const { isPendingCommentPressed, isPostSummaryVisible } = this.state;
    return (
      <div style={{ backgroundColor: 'white', width: '98%' }}>
        <Container>
          <Sidebar
            style={{ marginRight: 20 }}
            width={isNavSideExpand ? 220 : 56}
            collapsible
          >
            <NavSide />
          </Sidebar>
          <Container>
            <Header>
              <div className="flex-direction-row">
                <h1>Comment</h1>
                <div>
                  {!isPendingCommentPressed ? (
                    <Button
                      variant="success load-pending-button"
                      onClick={this.loadPendingComment.bind(this)}
                      size="sm"
                    >
                      Load Pending Comment
                    </Button>
                  ) : null}
                  <Button
                    variant="warning load-pending-button"
                    onClick={this.loadPostSummary.bind(this)}
                    size="sm"
                  >
                    Summary
                  </Button>
                  <Button
                    variant="info load-pending-button"
                    onClick={this.saveData.bind(this)}
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              </div>
              <Spinner
                isVisible={isSpinnerVisible}
                label={LOAD_PANDING_COMMENT_SPINNER}
              />
              <PostSummaryModal
                isVisible={isPostSummaryVisible}
                post={postDetail}
                comments={comments}
                wordData={wordsCloud}
                handleClose={this.closePostSummaryModal.bind(this)}
              />
            </Header>
            <Content>
              {!isSpinnerVisible && (
                <div
                  style={{
                    paddingBottom: '10%'
                  }}
                >
                  <BootstrapTable
                    data={comments}
                    selectRow={selectRowProp}
                    striped
                    hover
                    condensed
                    pagination
                    insertRow
                    deleteRow
                    options={options}
                    search
                    exportCSV
                    defaultSorted={defaultSorted}
                    // headerStyle={{ position: 'sticky' }}
                    // tableStyle={{ overflow: 'auto', height: 600 }}
                  >
                    <TableHeaderColumn
                      dataField="id"
                      isKey
                      dataAlign="center"
                      dataSort
                      hidden
                    >
                      Comment ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="user_id"
                      dataAlign="center"
                      width="15%"
                      dataSort
                    >
                      User
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="post_date"
                      dataAlign="center"
                      width="10%"
                      dataSort
                    >
                      Post Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="content"
                      width="50%"
                      dataAlign="center"
                      // tdStyle={{ whiteSpace: 'normal', color: 'red' }}
                      // thStyle={{
                      //   whiteSpace: 'normal',
                      //   color: 'red'
                      // }}
                    >
                      Comment Content
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="button"
                      dataFormat={buttonFormatter}
                      width="10%"
                      dataAlign="center"
                    >
                      Result
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="button"
                      dataFormat={buttonStatusFormatter}
                      width="10%"
                      dataAlign="center"
                    >
                      Status
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              )}
            </Content>
          </Container>
        </Container>
      </div>
    );
  }
}
export default RetrievedComment;
