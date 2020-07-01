const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const Recipe = require('./models/Recipe');
const User = require('./models/User');

//graphQL express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');


//Create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//initilizing app
const app = express();
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000'],///\.example2\.com$/
    creadentials: true
}
app.use(cors(corsOptions));
// app.use(express.json())

//jwt token verification
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('VERIFYING TOKEN');
    if(token !== 'null'){
        try{
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        }catch(e){
            console.log(e)
        }
    }
    next();
})

//Create graphQL application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

//Connects Schemas with GraphQL
app.use('/graphql', 
    express.json(),
    graphqlExpress(({ currentUser }) => ({
        schema,
        context: {
            Recipe,
            User,
            currentUser
    }
})))

const PORT = process.env.PORT || 4567;
const MONGO_URI = process.env.MONGO_URI;


//connect to db
mongoose.connect(MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
     () => {
    console.log('DB CONNECTED');
}).catch(err => console.error(err));


app.listen(PORT, () => {
    console.log(`LISTENING ON ${PORT}`)
})