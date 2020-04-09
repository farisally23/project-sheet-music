const { GraphQLServer } = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const express = require('express')
const path = require('path')
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


// server.express.use(express.static(path.join(__dirname, 'client/build')))


// server.express.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })


server.start(() => console.log(`Server is running on http://localhost:4000`))
