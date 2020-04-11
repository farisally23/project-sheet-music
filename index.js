const { GraphQLServer } = require('graphql-yoga')
const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const express = require('express')
const path = require('path')
const fs = require('fs')
//const User = require('./resolvers/User')

const resolvers = {
  Query,
  Mutation,
  //User,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
  }),
})


// Serve the static files when deployed, remove these lines to enable GraphQL playground
server.express.use(express.static(path.join(__dirname, 'client/build')))

server.express.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Configure HTTPS
let privateKey = fs.readFileSync( 'server.key' );
let certificate = fs.readFileSync( 'server.crt' );
let config = {
        key: privateKey,
        cert: certificate
};



server.start({https: config}, () => console.log(`Server is running on https://localhost:4000`))
