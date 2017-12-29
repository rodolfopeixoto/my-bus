import React, { Component } from 'react';
import FormBase from '../components/FormBase'
import Header from '../components/Header';

class Login extends Component {
    state = {  }
    render() {
        return (
            <div>
                <Header linkBack={'/'} />
            <FormBase 
              textSubmit={'Login'} 
              linkName={'Cadastrar'} 
              link={'/cadastrar'} 
              linkSubmit={'/search'}
            />
            </div>      
        );
    }
}

export default Login;