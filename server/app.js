(async () => {
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const session = require('express-session');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const jwt = require('jsonwebtoken');
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

  const UserModel = require('./models/UserModel');
  const schema = require('./data/schema');
  const config = require('./config');

  // const generate = require('./data/generate');

  const PORT = process.env.PORT || 1337;

  const app = express();

  // Connect to Database and get server secret
  try {
    await mongoose.connect(config.database);
    console.log('Database connected successfully!');
  } catch (err) {
    console.log(`Database connection failed, ${err}`);
  }

  const secret = await config.secret();

  // generate.mongoData();

  // Passport Authentication
  passport.use('login',
    new LocalStrategy(function(username, password, done) {
      UserModel.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.use('signup', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      findOrCreateUser = function() {
        // find a user in Mongo with provided username
        User.findOne({ email: username}, function(err, user) {
          // In case of any error return
          if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log('User already exists');
            return done(null, false,
          } else {
            // if there is no user with that email
            // create the user
            const newUser = new UserModel({
              name: req.param.name,
              email: username,
              password,
            });

            // save the user
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    });
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

  app.use(cors());

  // Setup express session
  app.use(session({ secret, resave: false, saveUninitialized: false }));

  // Body Parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // use morgan to log requests to the console
  app.use(morgan('dev'));

  //    * THEORY
  //    * 1) User Stores token in localStorage
  //    * 2) User sends the token in the header with fetch(url, options) <- req.header can go in options
  //    * 3) Verify the JWT in each resolver ?

  // GraphQL
  app.use('/graphql', bodyParser.json(), (req, res) => {
    // needs to be tested from the Client
    const context = {
      token:
        req.headers && req.headers.Authorization
          ? req.headers.Authorization
          : null,
    };
    return graphqlExpress({ schema, context })(req, res);
  });

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // Passport Init
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  app.get('/', (req, res) => res.redirect('/login'));

  app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/views/Login.html`);
  });

  app.post('/login', passport.authenticate('local'), (req, res) => {
    const payload = {
      id: req.user._id,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: '24h',
    });

    res.json({ token });
  });

  app.listen(PORT, () =>
    console.log(`GraphiQL running on http://localhost:${PORT}/graphiql`)
  );
})();
