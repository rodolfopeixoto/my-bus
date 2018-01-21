import { db } from './firebase';

//USER UPDATE USER
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


//Linha CADASTRAR
export const doCreateLine = (business, numberLine, itinerary, timestamp, email, updated_at, city) =>

  db.ref(`/linhas/${city}`).push({
    business,
    numberLine,
    itinerary,
    timestamp,
    email,
    updated_at
  })

// Return all Linhas
export const onceGetLines = () =>
  db.ref('linhas/camposDosGoytacazes').once('value');


// Share location cadastrar
export const doCreateShareLocation = (email, city, latitude, longitude, numberLine, itinerary) =>
  db.ref(`/localizacao/${city}`).push({
    email,
    city,
    latitude,
    longitude,
    numberLine,
    itinerary
  })
//  db.ref(`/localizacao/${city}`).remove();