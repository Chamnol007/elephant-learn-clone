import React, { Component } from 'react';
import { Navbar, Button, ButtonToolbar } from 'react-bootstrap';
import { MdMenu } from 'react-icons/md';
import { Toggle } from 'rsuite';

class Header extends Component {
  _handleLogout() {
    if (window.confirm('Are you sure you wish to logout from system?')) {
      this.props.logout();
    }
  }

  _handleDarkModeToggle() {
    this.props.toggleDarkMode();
  }
  render() {
    const { toggleNavSide } = this.props;
    return (
      <Navbar
        bg="dark"
        variant="dark"
        className="fixed-top collapseOnSelect nav-bar"
      >
        {!this.props.isLogin ? null : (
          <ButtonToolbar>
            <Button
              variant="outline-secondary"
              onClick={() => {
                toggleNavSide();
              }}
            >
              <MdMenu size={24} color={'white'} />
            </Button>
          </ButtonToolbar>
        )}

        <Navbar.Brand
          style={{ justifyContent: 'center', display: 'flex', width: '100%' }}
          href="home"
        >
          Elephant Learn
        </Navbar.Brand>
        {!this.props.isLogin ? null : (
          <div>
            <Toggle
              size="lg"
              checkedChildren="Dark"
              unCheckedChildren="Light"
              onChange={this._handleDarkModeToggle.bind(this)}
            />
          </div>
        )}
      </Navbar>
    );
  }
}

export default Header;
