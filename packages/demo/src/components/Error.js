import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

const Error =  (props) => (
  <div className="error">
    <div>
      <h1>{props.message || 'There has been an error'}</h1>
    </div>
  </div>
);

Error.propTypes = {
  message: PropTypes.string,
}

export default Error;