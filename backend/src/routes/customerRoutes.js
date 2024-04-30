const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// Route to register a new customer
router.post("/register", customerController.registerCustomer);

module.exports = router;
