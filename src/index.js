import React from 'react';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Map from './pages/Map';
import Bus from './pages/Bus';
import MyLocation from './pages/MyLocation';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    (
        <Router>
            <div>
                <Route exact path='/' component={Login} />
                <Route path='/login' component={Login} />
                <Route path='/cadastrar' component={Register} />
                <Route path='/mapa' component={Map} />
                <Route path='/search' component={Bus} />
                <Route path='/localizacao' component={MyLocation} />
            </div>
        </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();