import React, { Component } from 'react';
import logo from './../logo.svg';
import './../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Header extends Component {
    render() {
        return (
        <header className="App-header">
           <Link to={this.props.linkBack}>
              <Button>Voltar</Button>
            </Link>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to MyBus</h1>
        </header>
        );
    }
}

export default Header;