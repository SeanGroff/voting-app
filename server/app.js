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
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({
      schema,
      context: { token: req.get('token') },
    }))
  );

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // serve up React frontend
  // app.use(express.static(`${__dirname}./../build`));

  // Passport Init
  app.use(passport.initialize());
  app.use(passport.session());

  // Error handler
  app.use((err, req, res, next) => {
    console.log('====== ERROR =======');
    console.error(err.stack);
    res.status(500);
  });

  // Routes
  app.post('/login', authController.login, (req, res) => {
    const payload = {
      id: req.user._id,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: '24h',
    });

    res.json({ token });
  });

  app.post('/logout', authController.logout);

  app.post(
    '/signup',
    userController.validateSignUp,
    userController.register,
    authController.login,
    (req, res) => {
      const payload = {
        id: req.user._id,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: '24h',
      });

      res.json({ token });
    }
  );

  app.listen(PORT, () =>
    console.log(`GraphiQL running on http://localhost:${PORT}/graphiql`)
  );
})();
