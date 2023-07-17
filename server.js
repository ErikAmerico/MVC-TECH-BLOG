// Import required modules
const express = require('express');
const session = require('express-session');
//const exphbs = require('express-handlebars');
const { create } = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up the Express.js app
const app = express();
const PORT = process.env.PORT || 3001;

//const hbs = exphbs.create({ helpers });

// Set up session middleware
app.use(
  session({
    secret: 'very secret message that you cannot guess',
    resave: false,
    cookie: {},
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
  })
);

// Set up Handlebars.js as the template engine
// app.engine('handlebars', create({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

const hbs = create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// Middleware to parse request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// const authRoutes = require('./controllers/authController');
// app.use('/auth', authRoutes);

const routes = require('./controllers');
app.use(routes);


// Start the server
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`))
});

  // name: 'erkik',
  // email: 'olsonerik911@gmail.com',
  // password: 'password332'
