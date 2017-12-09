import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

const Loading =  () => (
  <div className="loading">
    <ReactLoading
      type="bars" 
      width={100}
      height={100}
      color="#c21a78"
    />
  </div>
);

export default Loading;