import React, { Component } from 'react';
import FormBase from './../components/FormBase';
import Header from './../components/Header';

class Register extends Component {
    state = {}
    render() {
        return (
            <div>
                <Header linkBack={'/'} />
                <FormBase 
                  textSubmit={'Cadastrar'} 
                  linkName={'Login'} 
                  link={'/login'}  
                  linkSubmit={'/search'}
                  />
            </div>
        );
    }
}

export default Register;