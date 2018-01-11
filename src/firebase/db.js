import { db } from './firebase';

//USER API
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
      username,
      email
  })

  // Return all Users
export const onceGetUsers = () =>
  db.ref('users').once('value');