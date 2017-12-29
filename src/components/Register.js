import React, { Component } from 'react';
import FormBase from './FormBase';
import Header from './Header';

class Register extends Component {
    state = {}
    render() {
        return (
            <div>
              <Header />
                <FormBase submit={'Cadastrar'} linkName={'Login'} link={'/login'}  />
            </div>
        );
    }
}

export default Register;