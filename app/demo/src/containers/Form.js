import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBloj } from '../actions/blojs';
import { Col, Card, CardBody, Button, Form as HTMLForm, FormGroup, Label, Input } from 'reactstrap';
import './Form.css';

class Form extends Component {
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
      message: ''
    };
  }

  onChange(message) {
    this.setState({ message });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.createBloj({ message: this.state.message }, this.props.node);
        
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <HTMLForm className="bloj" onSubmit={this.onSubmit}>
          <FormGroup row>
            <Label for="data" sm={4}>Message</Label>
            <Col sm={8}>
              <Input type="textarea" name="message" value={this.state.message} onChange={e => this.onChange(e.target.value)} />
            </Col>
          </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 8, offset: 4 }}>
                <Button color="success">Create</Button>
              </Col>
            </FormGroup>  
          </HTMLForm>
        </CardBody>
      </Card>
    );
  }
}

export default connect(() => ({}), {
  createBloj,
})(Form);