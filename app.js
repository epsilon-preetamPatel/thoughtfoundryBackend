const express = require('express');
const app = express();
const http = require('http');
const rm = require('./services/require.module');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const port = rm.settings.port || 3000;

process.on('uncaughtException', error => {
  console.log('%c%s', 'color: #ff0000', error);
});

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use(cors());

const typeDefs = gql(rm.fs.readFileSync('./services/graphql/schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./services/graphql/resolvers');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
// await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.use(require('./router'));
rm.mongoose.connect(rm.settings.thoughtFounderDB.uri, rm.settings.thoughtFounderDB.options);
app.use(function (req, res) {
  rm.responseHandler(req, res, { error: { message: 'URL NOT FOUND' }, status: 404 });
});

const server = http.createServer(app);

server.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
