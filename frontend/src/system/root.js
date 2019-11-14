import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import AboutContainer from '../containers/AboutContainer';
import ResultContainer from '../containers/ResultContainer';
import ViewPercentage from '../components/main-components/ViewPercentage';
import RetrievedPostContainer from '../containers/RetrievedPostContainer';
import RetrievedCommentContainer from '../containers/RetrievedCommentContainer';
import StatisticContainer from '../containers/StatisticContainer';
import Notfound from '../utils/NotFound';
import HeaderContainer from '../containers/HeaderContainer';
import GlobalContainer from '../containers/GlobalContainer';
import Login from '../containers/LoginContainer';
import DataList from '../containers/DataListContainer';
class Root extends Component {
  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange() {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'offline') {
      alert('No internet connection.');
      return;
    }
  }
  render() {
    const ProtectedRoutes = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
    return (
      <Router>
        <HeaderContainer />
        <GlobalContainer />
        <Switch>
          <Route
            path="/login"
            render={() =>
              !this.props.isLogin ? <Login /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            render={() =>
              this.props.isLogin ? <HomeContainer /> : <Redirect to="/login" />
            }
            path="/"
          />
          <ProtectedRoutes path="/home" component={HomeContainer} />
          <ProtectedRoutes path="/about" component={AboutContainer} />
          <ProtectedRoutes path="/data" component={DataList} />
          <Route
            path="/model"
            render={() =>
              this.props.isLogin ? <ResultContainer /> : <Login />
            }
          />
          <ProtectedRoutes path="/viewPercentage" component={ViewPercentage} />
          <ProtectedRoutes path="/statistic" component={StatisticContainer} />
          <ProtectedRoutes
            path="/retrievedPost"
            component={RetrievedPostContainer}
          />
          <Route
            path={`/comment=${this.props.postID}`}
            render={() =>
              this.props.isLogin ? (
                <RetrievedCommentContainer />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
