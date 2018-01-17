import React, { Component } from 'react';
import Header from './Header';
import * as routes from '../constants/routes';

class MyLocation extends Component {
    render() {
        return (
            <div>
                <Header linkBack={routes.SEARCH_BUS} />
                <div className="container">
                  <p>
                    Olá, muito obrigado por ajudar a aumentar essa corrente do bem!
                    Você está ajudando 0 pessoas. Mas não desligue, pois a qualquer momento as pessoas podem
                    acessar. Nós pegamos sua localização de 1 em 1 minuto para que possamos a cada 1 minuto mostrar
                    a localização.
                  </p>
                </div>
            </div>      
        );
    }
}


export default MyLocation;