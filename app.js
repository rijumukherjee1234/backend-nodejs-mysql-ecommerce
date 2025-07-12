const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const connection = require("./src/config/db");
const authRoutes = require('./src/routes/authroutes'); 
const masterroutes = require('./src/routes/masterroutes.js'); 
const path = require('path');
require('dotenv').config();

// ✅ CORS must come before all routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Your routes
app.use('/auth', authRoutes);
app.use('/webapi', masterroutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
