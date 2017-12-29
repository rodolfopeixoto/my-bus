import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class FormBase extends Component {

    render() {
        return (
          <Container>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </FormGroup>

              <FormGroup>
                <Link to={this.props.linkSubmit}><Button>{ this.props.textSubmit }</Button></Link>
              </FormGroup>
              
              <FormGroup>
                <Link to={this.props.link}>{ this.props.linkName }</Link>
              </FormGroup>
            </Form>
          </Container>          
        );
    }
}

export default FormBase;