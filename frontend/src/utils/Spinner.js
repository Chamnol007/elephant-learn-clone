import React from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 10 auto;
  border-color: gray;
`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    const { label, isVisible } = this.props;
    return (
      <div className="sweet-loading">
        {label && isVisible && (
          <h3>
            <span>{label}</span>
          </h3>
        )}
        <BarLoader
          css={override}
          width={69.4}
          widthUnit={'em'}
          height={10}
          heightUnit={'px'}
          color={'gray'}
          loading={isVisible}
        />
      </div>
    );
  }
}

export default Spinner;
