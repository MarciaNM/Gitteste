import  {  RESTDataSource  }  from  'apollo-datasource-rest' ;
import  {  makeUserDataLoader  }  from  './dataloaders' ;


export  class  UsersApi  extends  RESTDataSource  {
  construtor( )  {
    super();
    this.baseURL  =  processo . env . API_URL  +  '/users/' ;
    this.dataLoader  =  makeUserDataLoader ( this .getUsers . bind ( this ) ) ;
  }

  async  getUsers ( urlParams  =  { } )  {
    devolva  isso . get ( '' ,  urlParams ,  {
      cacheOptions : {  ttl : 0  } ,
    } ) ;
  }

    async  getUser ( id )  {
      return  this . get ( id ,  undefined ,  {
      cacheOptions : {  ttl : 0  } ,
    } ) ;
  }

  batchLoadById ( id )  {
    return  this . dataLoader . load( id ) ;
  }
}
