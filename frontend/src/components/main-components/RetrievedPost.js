import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PostDetailModal from '../sub-components/PostDetailModal';
import NavSide from '../sub-components/NavSide';
import { Container, Sidebar, Content, Header } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class RetrievedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      postModalData: {}
    };
  }

  _showModal() {
    this.setState({
      isModalVisible: true
    });
  }

  _hideModal() {
    this.setState({
      isModalVisible: false
    });
  }

  _goToComment() {
    this.setState({
      isModalVisible: false
    });
    this.props.downloadRetrievedComments(this.state.postModalData.id);
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
        if (!isSelect) {
          this._showModal();
        }
      }
    };
    const defaultSorted = [
      {
        dataField: 'post_date',
        order: 'desc'
      }
    ];

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
          </Sidebar>
          <Container>
            <PostDetailModal
              isVisble={this.state.isModalVisible}
              handleClose={this._hideModal.bind(this)}
              handleConfirm={this._goToComment.bind(this)}
              data={this.state.postModalData}
            />
            <div>
              <Header>
                <h1>Post</h1>
              </Header>
            </div>
            <Content>
              <div style={{ paddingBottom: '10%' }}>
                <BootstrapTable
                  data={this.props.posts}
                  selectRow={selectRowProp}
                  striped
                  hover
                  condensed
                  pagination
                  insertRow
                  deleteRow
                  search
                  defaultSorted={defaultSorted}
                >
                  <TableHeaderColumn
                    dataField="id"
                    isKey
                    dataAlign="center"
                    width="10%"
                    dataSort
                  >
                    Post ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="user_id"
                    dataAlign="center"
                    width="20%"
                    dataSort
                  >
                    User
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="post_date"
                    dataAlign="center"
                    width="15%"
                    dataSort
                  >
                    Post Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="post_title"
                    dataAlign="center"
                    width="30%"
                  >
                    Post Title
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="post_tags"
                    dataAlign="center"
                    width="20%"
                  >
                    Post Tag
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </Content>
          </Container>
        </Container>
      </div>
    );
  }
}
export default RetrievedPost;
