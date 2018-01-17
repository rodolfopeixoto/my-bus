import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

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
        <h1>Home</h1>
        <p>The Home Page is accessble by every signed in user.</p>

        { !!users && <UserList users={users} /> }

      </div>
    );
  }
}



const UserList = ({ users }) =>
 <div>
   <h2>Vamos compartilhar e mudar a cidade?</h2>

   {
     Object.keys(users).map( key => 
      <div key={key}>Olá, {users[key].nome}</div>
    )
   }

 </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);