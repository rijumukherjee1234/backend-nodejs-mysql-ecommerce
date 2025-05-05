const express = require('express');
const app = express();
const PORT = 3000;
const connection = require("./src/config/db");
const authRoutes = require('./src/routes/authroutes'); 
const masterroutes = require('./src/routes/masterroutes.js'); 
require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/webapi', masterroutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
