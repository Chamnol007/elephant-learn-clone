import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CommentModal from '../sub-components/CommentModal';
import NavSide from '../sub-components/NavSide';
import { Container, Content, Sidebar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      commentModalData: {}
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

  _updateResult(value) {
    this.setState({
      isModalVisible: false
    });
    this.props.updateResutlComment(this.state.commentModalData.id, value);
  }

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: 'rgb(238, 193, 213)',
      onSelect: (row, isSelect, rowIndex, e) => {
        this.setState({
          commentModalData: row
        });
        if (!isSelect) {
          this._showModal();
        }
      }
    };

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
            <CommentModal
              isVisble={this.state.isModalVisible}
              handleClose={this._hideModal.bind(this)}
              handleConfirm={this._updateResult.bind(this)}
              data={this.state.commentModalData}
            />
            <h1>Model</h1>
            <Content>
              <BootstrapTable
                data={this.props.comment}
                selectRow={selectRowProp}
                striped
                hover
                condensed
                pagination
                insertRow
                deleteRow
                search
                exportCSV
                // defaultSorted={defaultSorted}
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
                  dataField="comment"
                  dataAlign="center"
                  width="85%"
                  dataSort
                >
                  Original
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="result"
                  width="10%"
                  dataAlign="center"
                >
                  Result
                </TableHeaderColumn>
              </BootstrapTable>
            </Content>
          </Container>
        </Container>
      </div>
    );
  }
}
export default Result;
