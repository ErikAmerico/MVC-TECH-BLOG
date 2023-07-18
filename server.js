
const express = require('express');
const session = require('express-session');
const { create } = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const authRoutes = require('./controllers/authController');
const dashboardRoutes = require('./controllers/dashboardController');

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

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/public/delete-post.js', (req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public', 'delete-post.js'));
});


app.use('/auth', authRoutes);


app.use('/dashboard', dashboardRoutes);


const routes = require('./controllers');
app.use(routes);


sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`))
});
