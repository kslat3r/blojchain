import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const Empty = (props) => (
  <Alert color="secondary">
    {props.message || 'No data found'}
  </Alert>
);

Empty.propTypes = {
  message: PropTypes.string,
}

export default Empty;