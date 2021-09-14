import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter,Redirect, Switch } from "react-router-dom";
import {ApolloCache,
  ApolloClient,
  ApolloProvider,
  HttpLink,from, InMemoryCache}
   from '@apollo/client';
import {onError}  from '@apollo/client/link/error' //it contains a library to catch errors.
import GetAll from './Components/getAll';
import AddOne from './Components/addOne';
import NotFoundPage from './Components/common/notFoundPage';
// import { Link } from 'react-router';

const  errorLink = onError(({graphqlErrors,networkError})=>{  //in my opinon this is a good way to handle some errors.
  if(graphqlErrors){
    graphqlErrors.map(({message,location,path})=>{
      alert(`graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri:"http://localhost:4000/graphql"}), //if graphql caught any error we need to tell how we should respond.
]);

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link: link
});  //instance of apollo Cilient

function App() {
  return (
    <ApolloProvider client={client}>
      
      <BrowserRouter>
      <Switch>
      <Route exact path="/" component={GetAll}/>
      <Route exact path="/AddOne" component={AddOne}/>
      <Route path="/Not-Found" component={NotFoundPage}/>
      <Redirect to="/Not-Found" />
      </Switch>
      </BrowserRouter>
   
      
    
    </ApolloProvider>
  );
}

export default App;
