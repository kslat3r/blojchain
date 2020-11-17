import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const Loading = (props) => (
  <Alert color="secondary">
    {props.message || 'No data found'}
  </Alert>
);

Loading.propTypes = {
  message: PropTypes.string,
}

export default Loading;