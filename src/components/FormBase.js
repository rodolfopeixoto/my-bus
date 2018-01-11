import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class FormBase extends Component {

  constructor(props){
    super(props);
    this.page = this.props.page
  }

  onSubmit(event){
    
    event.preventDefault();
    
    if(this.page === 'signup'){
      console.log('signup');
    }else if(this.page === 'signin'){
      console.log('signin');
    }
    
  }

    render() {
        return (
          <Container>
            <Form onSubmit={ this.onSubmit.bind(this) } >
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="email" placeholder="with a placeholder" />
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password placeholder" />
              </FormGroup>

              <FormGroup>
                <Button>{ this.props.textSubmit }</Button>
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