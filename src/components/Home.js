import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import Navigation from './Navigation';


const INITIAL_STATE = {
  cidade: 'campos-dos-goytacazes',
  email: '',
  comentario: '',
  users: null,
  error: null,
  success: null,
  posts: null,
  nome: ''
}


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
    this.getPosts = this.getPosts.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  onSubmit(event){

    event.preventDefault();
    const {
      cidade,
      email,
      comentario,
      nome
     } = this.state;


    let timestamp = new Date().getTime();
    this.createPost(cidade, email, comentario, timestamp, nome);

  }

  createPost(cidade, email, comentario, timestamp, nome){
    db.doCreatePost(cidade, email, comentario, timestamp, nome)
      .then((success) => {
        this.setState({ cidade, email, comentario, timestamp, nome });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  getCurrentUser() {
    db.getUserForEmail().on('value', (snapshot) => {
      let users = snapshot.val();
      let user;
      Object.keys(users).map((key) => {
        if (users[key].email === auth.getUser().email) {
          user = users[key]
        }
      });
      this.setState({ nome: user.nome});
    });

  }

  getPosts() {
    db.getLastPosts().limitToLast(15).on('value', (snapshot) => {
      let posts = snapshot.val();
      this.setState({ posts })

    });
  }

  componentWillMount() {
    this.setState({ email: auth.getUser().email })
    this.getPosts();
    this.getCurrentUser();
  }

  render() {
    const {
      comentario,
      error,
      posts
    } = this.state;

    const isInvalid =
      comentario === ''
    return (
      <div>
        <Navigation />
        <div className="container">
          {error &&
            <div className="alert alert-danger">
              <strong>Error:</strong> {error.message}
            </div>
          }
          <h2>O que está acontecendo agora?</h2>
          <form onSubmit={this.onSubmit} className="form-control">
            <div className="form-group">
              <textarea
                value={comentario || ''}
                onChange={event => this.setState(byPropKey('comentario', event.target.value))}
                placeholder="Envie uma mensagem de até 200 caracteres"
                className="form-control"
                maxLength="200"
              ></textarea>
            </div>
            <button type="submit" disabled={isInvalid} className="form-control btn btn-primary">Enviar Comentário</button>
          </form>
        </div>


          { 
            posts 

            ?
            <PostsList posts={posts} />
            :

            <div className="container">Carregando</div>
          }
      </div>
    );
  }
}






class PostsList extends React.Component{

  constructor(props){
    super(props);
    this.millisecondsToDate = this.millisecondsToDate.bind(this);
  }


  millisecondsToDate(time) {
    return new Date(time).toString('d/MM/yyyy h:mm:ss');
  }


  render(){

    const {
      posts
    } = this.props;

      return(

        <div className="container">
          {
            Object.keys(posts).reverse().map(key =>
              <div key={key}>
                <div className="card">
                  <div className="card-header">
                    {posts[key].nome}
                  </div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>
                        {posts[key].comentario}
                      </p>
                      <footer className="blockquote-footer"> <cite title="Source Title">Publicado: {this.millisecondsToDate(posts[key].timestamp)}</cite></footer>
                    </blockquote>
                  </div>
                </div>
                <br />

              </div>
            )
          }
          </div>
      );
    }
  }


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);