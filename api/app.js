const express          = require('express');
const env              = require('dotenv');
const path             = require('path');


// /* Relative imports */
const user_router       = require('./routes/user');
const admin_router      = require('./routes/admin');
const account_router      = require('./routes/account');

/* setup express */
const app = express();
env.config();

// import db
require("./db/mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/uploads', express.static(__dirname));


// /** Routes */
app.use('/api/users', user_router);
app.use('/api/admin', admin_router);
app.use('/api/account',account_router);


app.use((req, res) => {
    return res.status(404).json({ error: 'Not found' });
  });
  
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ error: 'Internal error' });
  });




module.exports = app


