import React, { Component } from 'react';
import FormBase from './FormBase';
import Header from './Header';

class Login extends Component {
    state = {  }
    render() {
        return (
            <div>
              <Header />
              <FormBase submit={'Login'} linkName={'Cadastrar'} link={'/cadastrar'} />
            </div>      
        );
    }
}

export default Login;