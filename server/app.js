const express = require('express');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('./data/schema');

const generate = require('./data/generate');

const PORT = process.env.PORT || 1337;

const app = express();

(async () => {
  try {
    await mongoose.connect('mongodb://localhost/pollz');
    console.log('Database connection successful');
  } catch (err) {
    console.log(`Database connection failed, ${err}`);
  }
})();

generate.mongoData();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () =>
  console.log(`GraphiQL running on http://localhost:${PORT}/graphiql`)
);
