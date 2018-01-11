import React from 'react';
import './index.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import PasswordForget from './pages/PasswordForget'
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
                <Route exact path='/' component={SignIn} />
                <Route path='/login' component={SignIn} />
                <Route path='/cadastrar' component={SignUp} />
                <Route path='/esqueceu-senha' component={PasswordForget} />
                <Route path='/conta' component={Account} />
                <Route path='/mapa' component={Map} />
                <Route path='/search' component={Bus} />
                <Route path='/localizacao' component={MyLocation} />
            </div>
        </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();