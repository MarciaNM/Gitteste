
import fetch from 'node-fetch';

const  API_URL  =  processo . env . API_URL ;

const  get  =  ( endPoint ,  urlParam ,  requestInit  =  { } )  =>  {
   URL  const =
    API_URL  +  '/'  +  endPoint  +  '?'  +  new  URLSearchParams ( urlParam ) . toString ( ) ;
  return  fetch ( url ,  {
    method : 'GET' ,
    Headers : {
      'Content-Type' : 'application/json' ,
    } ,
    ... requestInit ,
  } ) ;
} ;

const  post  =  ( endPoint ,  body ,  requestInit  =  { } )  =>  {
  const  url  =  API_URL  +  '/'  +  endPoint ;
  return  fetch ( url ,  {
    method : 'POST' ,
    Headers : {
      'Content-Type' : 'application/json' ,
    } ,
    body : JSON . stringify ( body ) ,
    ... requestInit ,
  } ) ;
} ;

const  put  =  ( endPoint ,  body ,  requestInit  =  { } )  =>  {
  const  url  =  API_URL  +  '/'  +  endPoint ;
  return  fetch ( url ,  {
    method : 'PUT' ,
    Headers : {
      'Content-Type' : 'application/json' ,
    } ,
    body : JSON . stringify ( body ) ,
    ... requestInit ,
  } ) ;
} ;

const  patch  =  ( endPoint ,  body ,  requestInit  =  { } )  =>  {
  const  url  =  API_URL  +  '/'  +  endPoint ;
  return  fetch ( url ,  {
    method : 'PATCH' ,
    Headers : {
      'Content-Type' : 'application/json' ,
    } ,
    body : JSON . stringify ( body ) ,
    ... requestInit ,
  } ) ;
} ;

const  del  =  ( endPoint ,  body ,  requestInit  =  { } )  =>  {
  const  url  =  API_URL  +  '/'  +  endPoint ;
  return  buscar ( url ,  {
    method : 'DELETE' ,
    Headers : {
      'Content-Type' : 'application/json' ,
    } ,
    ... requestInit ,
  } ) ;
} ;

// CRUD
// Post Read Update Delete
// post get patch delete
( assíncrono  ( )  =>  {
  // GET -> Ler
  // const userGetResponse = await get('users/502');
  // const usuário = espera userGetResponse.json();
  // console.log(usuário);

  // POST -> Criar
  // const userResponse = await post('users', {
  // código: '6000',
  // firstName: 'CRIADO - Márcia',
  // sobrenome: 'CRIADO - Carvalho',
  // userName: 'CRIADO - marcia_carvalho81',
  // indexRef: 1,
  // createdAt: 'CRIADO - 2016-12-08T00:49:39.870Z',
  // });
  // const user = await userResponse.json();
  // console.log(usuário);

  // PUT -> Atualizar todo o objeto
  // const userResponse = await put('users/6000', {
  // firstName: 'EDITADO COM PUT - Márcia',
  // });
  // const user = await userResponse.json();
  // console.log(usuário);

  // PAT -> Atualizar o objetoCH
  // const userResponse = await patch('users/6000', {
  // firstName: 'EDITADO COM PATCH - Márcia',
  // });
  // const user = await userResponse.json();
  // console.log(usuário);

  // DELETE -> Apaga o objeto
  const  userResponse  =  await  del ( 'users/6000' ) ;
  const  user  =  espera  userResponse . json ( ) ;
  consola . log ( user ) ;
} ) ( ) ;

