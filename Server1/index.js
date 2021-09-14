const express  = require('express');
const {typeDefs} = require('./src/model/TypeDefs');
const {resolvers} = require('./src/model/Resolver');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const app = express();

//For Apollo Server Express 3.0 and above, 
//we need to define an async function that takes in typeDefs and resolvers parameters, 
//then assign the server to the same Apollo initialization as before
async function startApolloServer(typeDefs, resolvers){
    //  app.use('*',cors({origin:'http://localhost:4000'})); //cros origin issues
    const server = new ApolloServer({typeDefs, resolvers})
    
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    app.listen(4000, () => {
    console.log(`Server is listening on port 4000 ${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);