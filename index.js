const { GraphQLServer } = require('graphql-yoga')
const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
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
server.start(() => console.log(`Server is running on http://localhost:4000`))
