const express = require("express");
const mongoose = require("mongoose");
const bodyParser =  require("body-parser");
const helmet = require('helmet');
const path = require("path");
require('dotenv').config();

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce');

// Connexion à la base de données
mongoose.connect(process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Lancement de express
const app = express();
// module.exports = app;

/*MIDDLEWARES*/
// Configuration cors et sécurise les headers avec helmet
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Parse le body des req en json
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
 
module.exports = app;
