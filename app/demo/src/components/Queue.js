import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import Error from './Error';
import Loading from './Loading';
import Empty from './Empty';
import FontAwesome from 'react-fontawesome';
import './Queue.css';

class Queue extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    error: PropTypes.object,
    loading: PropTypes.bool,
    scroll: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
    forceScroll: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      open: props.open !== undefined ? props.open : false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!deepEqual(this.props.error, nextProps.error)) {
      return true;
    }

    if (!deepEqual(this.props.loading, nextProps.loading)) {
      return true;
    }

    if (!deepEqual(this.props.children, nextProps.children)) {
      return true;
    }
    
    if (this.state.open !== nextState.open) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    if (this.props.forceScroll && this.scrollElem) {
      this.scrollElem.scrollLeft = this.scrollElem.scrollWidth;
    }
  }

  toggle(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div className={`queue ${this.state.open && 'open'}`}>
        <div className="clearfix">
          <h2 className="float-left">{this.props.title}</h2>

          <a className="float-left" href="#toggle" onClick={this.toggle}>
            {this.state.open ? (
              <FontAwesome name="minus-square-o" />
            ) : (
              <FontAwesome name="plus-square-o" />
            )}
          </a>
        </div>

        {this.state.open && this.props.error && (
          <Error message={this.props.error.message} />
        )}

        {this.state.open && !this.props.error && this.props.loading ? (
          <Loading />
        ) : null}

        {this.state.open && !this.props.error && !this.props.loading && !this.props.children.length ? (
          <Empty message="No data to show" />
        ) : null}

        {this.state.open && !this.props.error && !this.props.loading && this.props.children.length ? (
          <div className={`row ${this.props.scroll && 'scroll'} ${!this.props.scroll && 'no-scroll'}`} ref={(elem) => { this.scrollElem = elem; }}>
            {this.props.children}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Queue;
