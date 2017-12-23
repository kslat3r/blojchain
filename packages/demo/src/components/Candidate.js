import React from 'react';
import PropTypes from 'prop-types';
import './Candidate.css';

const Candidate = (props) => (
  <div className="candidate">
    <form>
      <div>
        <label>Data</label>
        <textarea
          type="text"
          value={JSON.stringify(props.candidate.data)}
          readOnly
        />
      </div>
    </form>
  </div>
);

Candidate.propTypes = {
  candidate: PropTypes.object.isRequired,
};

export default Candidate;