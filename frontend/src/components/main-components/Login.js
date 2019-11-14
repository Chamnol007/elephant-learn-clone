import React, { Component } from 'react';
import {
  Container,
  Form,
  Button,
  Content,
  FlexboxGrid,
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  Col,
  Alert,
  Loader
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', isLoggingIn: false };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event });
  }

  _toggleLoginLoader() {
    this.setState({ isLoggingIn: !this.state.isLoggingIn });
  }

  handlePasswordChange(event) {
    this.setState({ password: event });
  }

  handleSubmit(event) {
    this._toggleLoginLoader();
    const { email, password } = this.state;
    event.preventDefault();
    this.props.login(email, password).then(response => {
      if (!response) {
        this.setState({
          email: '',
          password: ''
        });
      } else {
        this._showErrorAlert(response.message);
      }
      this._toggleLoginLoader();
    });
  }

  _showErrorAlert(message) {
    Alert.error(message, 5000);
  }
  render() {
    const { email, password, isLoggingIn } = this.state;
    return (
      <div style={{ paddingTop: '5%' }}>
        <Container>
          <Content>
            <FlexboxGrid justify="center" align="middle">
              {isLoggingIn ? (
                <Loader center content="Logging in........" />
              ) : (
                <FlexboxGrid.Item componentClass={Col} colSpan={12} md={6}>
                  <Panel header={<h3>Log In to Your Account</h3>} bordered>
                    <Form fluid onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={this.handleEmailChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={this.handlePasswordChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <ButtonToolbar>
                          <Button appearance="primary" type="submit">
                            Sign in
                          </Button>
                        </ButtonToolbar>
                      </FormGroup>
                    </Form>
                  </Panel>
                </FlexboxGrid.Item>
              )}
            </FlexboxGrid>
          </Content>
        </Container>
      </div>
    );
  }
}

export default Login;
