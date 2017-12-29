import React, { Component } from 'react';
import { Container, Form, FormGroup, Input } from 'reactstrap';

class SearchBus extends Component {
    render() {
        return (
            <div>
              <Container>
                <Form>
                  <FormGroup>
                    <Input type="search" name="search" id="exampleSearch" placeholder="search placeholder" />
                  </FormGroup>
                </Form>
              </Container>
            </div>      
        );
    }
}


export default SearchBus;