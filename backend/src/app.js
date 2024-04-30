const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");
const loanRoutes = require("./routes/loanRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const sequelize = require('./utils/database'); // import sequelize instance
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

// Setup routes
app.use("/customers", customerRoutes);
app.use("/loans", loanRoutes);
app.use("/payments", paymentRoutes);

// Sync models with database
sequelize.sync()
  .then(result => {
    console.log('Connected to the database successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = app;