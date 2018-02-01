# Meu Ônibus

A aplicação tem o intuito de melhorar paleativamente a utilização do transporte público em cidades que os ônibus não tem GPS ou que a prefeitura ainda não adicionou um aplicativo para as pessoas saberem aproximadamente onde está o ônibus. De forma colaborativa desejamos fazer as pessoas fazerem parte da mudança.

Quer ajudar no projeto? Da um fork e de um pull request. Adicionaremos tudo que for estável e funcional. Caso não seja aceito o pull request, você receberá um feedback construtivo.

App example: 

Version current Project 0.1
================

About version
---------------------

- React
 - React-router-dom
 - Bootstrap
 - Firebase
 - Create React App
 - Dedicação para um mundo melhor, com mais iniciativa e menos reclamação



Set up

Crie uma conta no firebase e crie um projeto web. Pegue os dados abaixo.
Pegue também o valor da API do Google Maps. :)

Crie na raiz do projeto projeto-name/ um arquivo chamado dev.env e adicione as seguintes variáveis de ambiente:

Não use aspas nos valores.
```
REACT_APP_API_KEY_FIREBASE=ADICIONEaquiAsuaAPIsemASPAS
REACT_APP_AUTH_DOMAIN=ADICIONEaquiOseuDOMAIN
REACT_APP_DATABASE_URL=ADICIONEaquiAdatabaseURL
REACT_APP_PROJECT_ID=ADICIONEaquiOproject_id
REACT_APP_STORAGE_BUCKET=ADICIONEaquiSTORAGEbucket
REACT_APP_MESSAGING_SENDER_ID=ADICIONEaquiAMESSAGINGsenderID
REACT_APP_API_MAP=ADICIONEaquiAMESSAGINGsenderID
```

---------------------

Caso queira rodar localmente, basta seguir os passos abaixo.

Clone o repositório, entre na pasta e crie o arquivo **dev.env* com os dados acima e de um:

```
docker-compose build
```

```bash
 docker-compose run --rm web npm install
```

```bash
  docker-compose up
```

Acesse o localhost:3001 e seja feliz!

Quero colocar em production!

Acesse o terminal do container

```bash
docker-compose run --rm web sh
```

O create react app cuida de melhorar e minificar seus arquivos. :)

```bash
yarn build
```

Vamos logar no firebase. Será gerado um link no terminal, copie e cole no navegador ou com o botão direito do mouse clique em abrir aba.

Acesse seu gmail e aceite. Após copie o código e cole no terminal.

```bash
firebase login --no-localhost
```

Inicialize o firebase

```bash
firebase init
```

Será criada alguns arquivos, entre no **firebase.json** mude a pasta **public** para **build**, deve ficar assim:

arquivo: firebase.json
```
{
  "hosting": {
    "public": "build"
  }
}

```

```
firebase deploy
```
Documentation
----------------------

Configurações de banco de dados e set up da API firebase

  arquivo: src/firebase/*.js

Style do mapa e dos botões:

  file: src/stylesheets/*.css  

Tela da visualização do ônibus:

  file: src/components/MapView.js
  
  No arquivo **MapView** você poderá visualizar e editar os mapa onde as pessoas poderão visualizar o ônibus.

Tela da visualização de compartilhamento da localização do ônibus
  arquivo: src/components/MapShare.js

  No arquivo **MapShare** você poderá visualizar e editar os mapa onde as pessoas poderão compartilhar a localização do ônibus.

Tela da visualização das linhas dos ônibus

  arquivo: src/components/Lines.js

  No arquivo **Lines** você poderá visualizar e editar o estilo das linhas.

Tela da visualização dos comentários

  arquivo: src/components/Home.js

  No arquivo **Home** você poderá visualizar e editar o estilo e configuração dos comentários.

### Links

Developer
---------------------
-   [Rodolfo Peixoto](https://www.rogpe.me)
-   [Amanda Gregório](https://www.facebook.com/amanda.oliveira.92)
-   [Pedro Rodrigues](https://www.pedrorls.com)
