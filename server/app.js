const express = require('express');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./models/UserModel');
const schema = require('./data/schema');

// const generate = require('./data/generate');

const PORT = process.env.PORT || 1337;

const app = express();

// Passport Authentication
passport.use(
  new LocalStrategy(function(username, password, done) {
    UserModel.findOne({ email: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await UserModel.findOne({ _id: id });
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

// Connect to Database
(async () => {
  try {
    await mongoose.connect('mongodb://localhost/pollz');
    console.log('Database connection successful');
  } catch (err) {
    console.log(`Database connection failed, ${err}`);
  }
})();

// generate.mongoData();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => res.json({ hello: 'world' }));

app.get('/login', (req, res) => {
  res.sendFile(`${__dirname}/views/Login.html`);
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.listen(PORT, () =>
  console.log(`GraphiQL running on http://localhost:${PORT}/graphiql`)
);
