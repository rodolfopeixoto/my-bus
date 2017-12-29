import React from 'react';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Map from './components/Map';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    (
        <Router>
            <div>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route path='/mapa' component={Map} />
                <Route path='/cadastrar' component={Register} />
            </div>
        </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();