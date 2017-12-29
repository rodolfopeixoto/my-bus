import React, { Component } from 'react';
import Header from '../components/Header';
import SearchBus from '../components/SearchBus';
import CardBus from '../components/CardBus';

class Bus extends Component {
    state = {  }
    render() {
        return (
            <div>
              <Header linkBack={'/'} />
              <SearchBus />
              <CardBus />
            </div>      
        );
    }
}

export default Bus;