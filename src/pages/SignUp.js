import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import { auth } from './../firebase/firebase';
import * as routes from './../constants/routes';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUp extends Component {


    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }
   
    

    onSubmit(event) {

        event.preventDefault();
        console.log('Email: ', this.email.value);
        console.log('Senha:', this.password.value);
        console.log('Confirme a Senha', this.passwordConfirm.value);
        this.signUp();

    }

    signUp(){
        auth.doCreateUserWithEmailAndPassword(this.email, this.password)
        .then( authUser => {
            this.setState(() => ({ ...INITIAL_STATE }));
            console.log('SignUp');
            this.props.history.push(routes.HOME);
        })
        .catch( error => {
            this.setState(byPropKey('error', error));
        })
    }

    render() {

        const isInvalid =
          this.password !== this.passwordConfirm ||
          this.password === '' ||
          this.email === '' ||
          this.firstName === '' ||
          this.lastName === '';

        return (
            <div>
                <Header linkBack={'/'} />
                <Container>
                    { this.state.error && <p>{this.error.message}</p>  }
                    <Form onSubmit={this.onSubmit.bind(this)} >

                        <FormGroup>
                          <Label for="firstName">Nome</Label>
                          <Input type="text" name="firstName" id="firstName" placeholder="Carlos" innerRef={(firstName) => this.firstName = firstName} />
                        </FormGroup>

                        <FormGroup>
                          <Label for="lastName">Sobrenome</Label>
                          <Input type="text" name="lastName" id="lastName" placeholder="Andrade de Souza" innerRef={(lastName) => this.lastName = lastName} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="carlos@email.com.br" innerRef={ (email) => this.email = email} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Senha</Label>
                            <Input type="password" name="password" id="password" placeholder="Senha" innerRef={ (password) => this.password = password } />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Confirme a senha</Label>
                            <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirme a Senha" innerRef={(passwordConfirm) => this.passwordConfirm = passwordConfirm } />
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" size='lg' color='primary' style={styles.Button} disabled={isInvalid}>Cadastrar</Button>
                        </FormGroup>

                        <FormGroup>
                            <Link to={'/login'}>Login</Link>
                        </FormGroup>
                    </Form>
                </Container>  

            </div>
        );
    }
}


const styles = {
    Button: {
      cursor: 'pointer',   
    }
}

export default SignUp;