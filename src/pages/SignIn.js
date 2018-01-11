import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { auth } from '../firebase/firebase';
import * as routes from './../constants/routes';


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

const byPropKey = (propertyName, value) => () =>({
    [propertyName]: value,
});


class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit(event) {

        event.preventDefault();
        console.log('Signin');
        console.log('Email: ', this.email.value);
        console.log('Password: ', this.password.value);
        this.signIn();
    }

    signIn(){
      auth.doSignInWithEmailAndPassword(this.email, this.password)
        .then( () => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.props.history.push(routes.HOME);
        })
        .catch( error => {
          this.setState(byPropKey('error',error));
        });
    }
    

    render() {


        const isInvalid =
            this.password === '' ||
            this.email === '';

        return (
            <div>
                <Header linkBack={'/'} />
                <Container>
                    {this.state.error && <p>{this.error.message}</p>}
                    <Form onSubmit={this.onSubmit.bind(this)} >
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" innerRef={ (email) => this.email = email } />
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" innerRef={ (password) => this.password = password } />
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" size='lg' color='primary' style={styles.Button} disabled={isInvalid}>Login</Button>
                        </FormGroup>

                        <FormGroup>
                            <Link to='/cadastrar'>Cadastrar</Link>
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

export default SignIn;