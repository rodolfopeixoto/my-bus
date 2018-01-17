import { db } from './firebase';

//USER API
export const doCreateUser = (id, nome, sobrenome, email, cpf, dataDeNascimento) =>
  db.ref(`users/${id}`).set({
      nome,
      sobrenome,
      email,
      cpf,
      dataDeNascimento

  })

  // Return all Users
export const onceGetUsers = () =>
  db.ref('users').once('value');