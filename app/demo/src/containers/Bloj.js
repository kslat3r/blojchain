import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import { createBloj } from '../actions/blojs';
import { Col, Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Bloj.css';

class Bloj extends Component {
  static propTypes = {
    createBloj: PropTypes.func.isRequired,

    node: PropTypes.object,
    bloj: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bloj: props.bloj || {
        data: '',
      }, 
      socket: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.state.bloj, nextProps.bloj)) {
      this.setState({
        bloj: nextProps.bloj,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!deepEqual(this.props.bloj, nextProps.bloj)) {
      return true;
    }

    if (!deepEqual(this.state.bloj, nextState.bloj)) {
      return true;
    }

    return false;
  }

  onChange(key, value) {
    const bloj = Object.assign({}, this.state.bloj, {
      [key]: value
    });

    this.setState({ bloj });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.createBloj(JSON.parse(this.state.bloj.data), this.props.node);
        
    this.setState({
      bloj: {
        data: '',
      }
    });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Form className="bloj" onSubmit={this.onSubmit}>
            {this.state.bloj.id && (
              <FormGroup row>
                <Label for="id" sm={4}>ID</Label>
                <Col sm={8}>
                  <Input type="text" name="id" value={this.state.bloj.id} onChange={e => this.onChange('id', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            {this.state.bloj.height && (
              <FormGroup row>
                <Label for="height" sm={4}>Height</Label>
                <Col sm={8}>
                  <Input type="text" name="height" value={this.state.bloj.height} onChange={e => this.onChange('height', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            {this.state.bloj.nonce && (
              <FormGroup row>
                <Label for="nonce" sm={4}>Nonce</Label>
                <Col sm={8}>
                  <Input type="text" name="nonce" value={this.state.bloj.nonce} onChange={e => this.onChange('nonce', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            <FormGroup row>
              <Label for="data" sm={4}>Data</Label>
              <Col sm={8}>
                <Input type="textarea" name="data" value={this.state.bloj.id ? JSON.stringify(this.state.bloj.data) : this.state.bloj.data} onChange={e => this.onChange('data', e.target.value)} />
              </Col>
            </FormGroup>

            {this.state.bloj.prevHash && (
              <FormGroup row>
                <Label for="prevHash" sm={4}>Previous hash</Label>
                <Col sm={8}>
                  <Input type="text" name="prevHash" value={this.state.bloj.prevHash} onChange={e => this.onChange('prevHash', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            {this.state.bloj.timestamp && (
              <FormGroup row>
                <Label for="timestamp" sm={4}>Timestamp</Label>
                <Col sm={8}>
                  <Input type="text" name="timestamp" value={this.state.bloj.timestamp} onChange={e => this.onChange('timestamp', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            {this.state.bloj.hash && (
              <FormGroup row>
                <Label for="hash" sm={4}>Hash</Label>
                <Col sm={8}>
                  <Input type="text" name="hash" value={this.state.bloj.hash} onChange={e => this.onChange('hash', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            {this.state.bloj.confirmations !== undefined && (
              <FormGroup row>
                <Label for="confirmations" sm={4}>Confirmations</Label>
                <Col sm={8}>
                  <Input type="text" name="confirmations" value={this.state.bloj.confirmations.length} onChange={e => this.onChange('confirmations', e.target.value)} />
                </Col>
              </FormGroup>
            )}

            {!this.state.bloj.id && (
              <FormGroup check row>
                <Col sm={{ size: 8, offset: 4 }}>
                  <Button color="success">Create</Button>
                </Col>
              </FormGroup>  
            )}
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default connect(() => ({}), {
  createBloj,
})(Bloj);