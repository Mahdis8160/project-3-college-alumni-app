const express = require('express');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for nodemailer ------------------
const router = express.Router()
const cors = require('cors')
const nodemailer = require('nodemailer')
app.use(cors())
app.use("/", router)
// ----------------------------------



// const routes = require('./routes');
// import Apollo server
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

// Apollo server
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })
  await server.start()
  server.applyMiddleware({ app })
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}

startServer()


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});