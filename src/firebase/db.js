import { db } from './firebase';

//USER UPDATE USER
export const doCreateUser = (id, nome, sobrenome, email, cpf, dataDeNascimento) =>
  db.ref(`users/${id}`).set({
    nome,
    sobrenome,
    email,
    cpf,
    dataDeNascimento,
    admin: false

  })

// Return all Users
export const onceGetUsers = () =>
  db.ref('users').once('value');

// Return specific users
export const getUserForEmail = () =>
  db.ref('users')


//Linha CADASTRAR
export const doCreateLine = (nomeDaEmpresa, direcao, itinerario, cidade, paramsItinerario, pontos, transporte) =>
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
export const doCreateShareLocation = (email, cidade, latitude, longitude, itinerario, timestamp) =>
  db.ref(`/compartilhar-localizacao/${cidade}/${itinerario}`).push({
    email,
    cidade,
    latitude,
    longitude,
    itinerario,
    timestamp
  })


// getLast Location
export const onGetLocationLine = (cidade, itinerario) => 
  db.ref(`/compartilhar-localizacao/${cidade}/${itinerario}`)
//  db.ref(`/localizacao/${city}`).remove();


// Comentario CADASTRAR

export const doCreatePost = (cidade, email, comentario, timestamp, nome) =>
  db.ref(`/posts`).push({
    'campos-dos-goytacazes': true,
    email,
    comentario,
    timestamp,
    nome
  })


// Return all Posts
export const getLastPosts = () =>
  db.ref('posts')



// Get the last 10 users, ordered by key
// ref.child('users').orderByKey().limitToLast(10).on('child_added', ...)

// Get all users whose age is >= 25
// ref.child('users').orderByChild('age').startAt(25).on('child_added', ...)