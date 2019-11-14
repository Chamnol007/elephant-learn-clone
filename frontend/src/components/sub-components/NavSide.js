import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, Dropdown, Icon, Sidebar, Sidenav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {
  downloadRetrievedPosts,
  downloadComments,
  downloadStatistic,
  loadSavedData,
  openConfirmLogout
} from '../../actions';
import { history } from '../../system/history';
import _ from 'lodash';

const iconStyles = {
  width: 56,
  height: 56,
  lineHeight: '56px',
  textAlign: 'center'
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle fixed-bottom">
      <Navbar.Body>
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={children => {
              return <Icon style={iconStyles} icon="cog" />;
            }}
          >
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item onSelect={onChange}>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

class NavSide extends React.Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this);
  }
  _handleLogout() {
    this.props.openConfirmLogout();
  }
  render() {
    const {
      isNavSideExpand,
      downloadRetrievedPosts,
      downloadComments,
      downloadStatistic,
      loadSavedData
    } = this.props;
    const currentPage = history.location.pathname;
    return (
      <Sidebar
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed'
        }}
        width={isNavSideExpand ? 220 : 56}
        collapsible
      >
        <Sidenav
          expanded={isNavSideExpand}
          defaultOpenKeys={['3']}
          appearance="subtle"
        >
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                onClick={() => {}}
                eventKey="1"
                active={_.includes(currentPage, 'home')}
                icon={<Icon icon="dashboard" />}
              >
                Dashboard
              </Nav.Item>
              <Nav.Item
                active={
                  _.includes(currentPage, 'comment') ||
                  _.includes(currentPage, 'Post')
                }
                onClick={downloadRetrievedPosts}
                eventKey="2"
                icon={<Icon icon="comment" />}
              >
                Post
              </Nav.Item>
              <Nav.Item
                active={_.includes(currentPage, 'data')}
                onClick={loadSavedData}
                eventKey="3"
                icon={<Icon icon="save" />}
              >
                Data
              </Nav.Item>
              {/* <Dropdown
                eventKey="3"
                title="Advanced"
                icon={<Icon icon="magic" />}
              >
                <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
              </Dropdown> */}
              <Nav.Item
                eventKey="4"
                onClick={downloadComments}
                icon={<Icon icon="database" />}
              >
                Model
              </Nav.Item>
              <Nav.Item
                active={_.includes(currentPage, 'statistic')}
                eventKey="5"
                onClick={downloadStatistic}
                icon={<Icon icon="trend" />}
              >
                Statistic
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={isNavSideExpand} onChange={this._handleLogout} />
      </Sidebar>
    );
  }
}

const mapStateToProps = (state: Object) => {
  return {
    isNavSideExpand: state.scene.isNavSideExpand
  };
};

export default connect(
  mapStateToProps,
  {
    openConfirmLogout,
    downloadRetrievedPosts,
    downloadComments,
    downloadStatistic,
    loadSavedData
  }
)(NavSide);
