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
export const doCreateLine = (nomeDaEmpresa, direcao, itinerario, cidade, paramsItinerario, pontos, transporte ) =>

  db.ref(`/linhas/${cidade}`).push({
    nomeDaEmpresa,
    direcao,
    itinerario,
    cidade,
    paramsItinerario,
    pontos,
    transporte
  })

// Return all Linhas
export const onceGetLines = () =>
  db.ref('linhas/campos-dos-goytacazes').once('value');


// Share location cadastrar
export const doCreateShareLocation = (email, latitude, longitude, nomeDaEmpresa, direcao, itinerario, cidade, horarioAtualizacao ) =>
  db.ref(`/compartilhar-localizacao/${cidade}/${itinerario}`).push({
    email,
    latitude,
    longitude,
    nomeDaEmpresa,
    direcao,
    itinerario,
    cidade,
    horarioAtualizacao
  })
//  db.ref(`/localizacao/${city}`).remove();