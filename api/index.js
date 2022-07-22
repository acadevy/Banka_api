const express = require('express');
const app = express();

// const app = require('./app');
// require("dotenv").config();


const port = process.env.PORT || 6000;


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


