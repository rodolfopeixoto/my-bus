import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './../components/Header';

class MyLocation extends Component {
    render() {
        return (
            <div>
                <Header linkBack={'/search'} />
                <Container>
                    Olá, muito obrigado por ajudar a aumentar essa corrente do bem!
                    Você está ajudando 0 pessoas. Mas não desligue, pois a qualquer momento as pessoas podem
                    acessar. Nós pegamos sua localização de 1 em 1 minuto para que possamos a cada 1 minuto mostrar
                    a localização.
                </Container>
            </div>      
        );
    }
}


export default MyLocation;