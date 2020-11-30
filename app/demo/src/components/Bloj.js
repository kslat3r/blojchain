import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import { Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import './Bloj.css';

class Bloj extends Component {
  static propTypes = {
    node: PropTypes.object,
    bloj: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    if (!deepEqual(this.props.bloj, nextProps.bloj)) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Form className="bloj">
            <FormGroup row>
              <Label for="id" sm={4}>ID</Label>
              <Col sm={8}>
                <Input type="text" name="id" value={this.props.bloj.id} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="height" sm={4}>Height</Label>
              <Col sm={8}>
                <Input type="text" name="height" value={this.props.bloj.height} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="nonce" sm={4}>Nonce</Label>
              <Col sm={8}>
                <Input type="text" name="nonce" value={this.props.bloj.nonce} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="data" sm={4}>Data</Label>
              <Col sm={8}>
                <Input type="textarea" name="data" value={this.props.bloj.id ? JSON.stringify(this.props.bloj.data) : this.props.bloj.data} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="prevHash" sm={4}>Previous hash</Label>
              <Col sm={8}>
                <Input type="text" name="prevHash" value={this.props.bloj.prevHash} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="timestamp" sm={4}>Timestamp</Label>
              <Col sm={8}>
                <Input type="text" name="timestamp" value={this.props.bloj.timestamp} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="hash" sm={4}>Hash</Label>
              <Col sm={8}>
                <Input type="text" name="hash" value={this.props.bloj.hash} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="confirmations" sm={4}>Confirmations</Label>
              <Col sm={8}>
                <Input type="text" name="confirmations" value={this.props.bloj.confirmations !== undefined ? this.props.bloj.confirmations.length : 0} disabled />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Bloj;