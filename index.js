const express = require('express');
const app = express();

// config
require('dotenv').config();

// database

// middle wares |-> middle man for bunch-o  stuff
app.get('/', (req, res) => {
  res.json({msg: "You have reached the backend"});
})

// routes

// listen to port
app.listen(process.env.PORT, ()=> {
  console.log(`Server running on port ${process.env.PORT}`);
})