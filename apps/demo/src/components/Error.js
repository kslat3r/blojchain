import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const Error = (props) => (
  <Alert color="danger">
    {props.message || 'There has been an error'}
  </Alert>
);

Error.propTypes = {
  message: PropTypes.string,
}

export default Error;