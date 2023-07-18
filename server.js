
const express = require('express');
const session = require('express-session');
const { create } = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

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


const hbs = create({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const authRoutes = require('./controllers/authController');
app.use('/auth', authRoutes);

const dashboardRoutes = require('./controllers/dashboardController');
app.use('/dashboard', dashboardRoutes);


const routes = require('./controllers');
app.use(routes);


// Start the server
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`))
});
