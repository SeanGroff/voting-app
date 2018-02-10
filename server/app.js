(async () => {
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const session = require('express-session');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const jwt = require('jsonwebtoken');
  const expressValidator = require('express-validator');
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

  const UserModel = require('./models/UserModel');
  const userController = require('./controllers/userController');
  const authController = require('./controllers/authController');
  const schema = require('./data/schema');
  const config = require('./config');

  require('./handlers/passport');

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

  // serve up React frontend
  app.use(express.static(`${__dirname}./../build`));

  // Exposes a bunch of methods for validating date. (Mainly in the userController)
  app.use(expressValidator());

  app.use(cors());

  // Setup express session
  app.use(session({ secret, resave: false, saveUninitialized: false }));

  // Body Parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // use morgan to log requests to the console
  app.use(morgan('dev'));

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
  app.post('/login', passport.authenticate('local'), (req, res) => {
    const payload = {
      id: req.user._id,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: '24h',
    });

    res.json({ token });
  });

  app.post(
    '/signup',
    // 1) Validate the registration data
    userController.validateSignUp,
    // 2) register the user
    userController.register,
    // 3) log user in
    authController.login
  );

  app.listen(PORT, () =>
    console.log(`GraphiQL running on http://localhost:${PORT}/graphiql`)
  );
})();
