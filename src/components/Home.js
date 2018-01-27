import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import Navigation from './Navigation';

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: null
    };
  }


  componentDidMount(){
    db.onceGetUsers()
      .then(snapshot => 
        this.setState( () => ({ users: snapshot.val() }))
      );
  }
  

  render(){

    const { users } = this.state;

    return(
      <div>
        <Navigation />
        <div className="container">
          <h2>Vamos compartilhar e mudar a cidade?</h2>
          <p>The Home Page is accessble by every signed in user.</p>

          { !!users && <UserList users={users} /> }
        </div>
      </div>
    );
  }
}



const UserList = ({ users }) =>
 <div className="container">

   {
     Object.keys(users).map( key => 
      <div key={key}>Olá, {users[key].nome}</div>
    )
   }

  <h3>Convide seus amigos a testar</h3>
  <h4>Você tem x convites</h4>
  <form className="form-control">
    <div className="form-group">
      <input
        type="email"
        placeholder="carlos@meubus.me"
        className="form-control"
      />
    </div>
    <button type="submit" className="form-control btn btn-primary">Convidar</button>
  </form>
 </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);