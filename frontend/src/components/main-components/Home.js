import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import NavSide from '../sub-components/NavSide';
import { Container, Sidebar, Content } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class Home extends Component {
  componentDidMount() {
    // this.props.downloadRetrievedPosts();
    // this.props.downloadComments();
  }

  _goToPostPage() {
    this.props.downloadRetrievedPosts();
  }
  render() {
    const { isNavSideExpand } = this.props;
    return (
      <Container>
        <Sidebar
          style={{ marginRight: 20 }}
          width={isNavSideExpand ? 220 : 56}
          collapsible
        >
          <NavSide />
        </Sidebar>
        <Container>
          <Content>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Carousel>
                <Carousel.Item>
                  <img
                    className="cover-fill"
                    src={require('../../assets/ElephantLearn.jpg')}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src={require('../../assets/Elephant Learn.png')}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src={require('../../assets/ElephantLearn(1).jpg')}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Content>
        </Container>
      </Container>
    );
  }
}

export default Home;
