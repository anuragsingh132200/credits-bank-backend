const Customer = require("../models/Customer");
const { validateCustomerRegistration } = require("../utils/validation");
// Controller function to register a new customer
const registerCustomer = async (req, res, next) => {
  try {
    // Retrieve request body
    const { first_name, last_name, age, monthly_income, phone_number } =
      req.body;

    // Validate request body
    if (validateCustomerRegistration(req.body) == 0) {
      res.status(400).json({ message: "Invalid request body" });
    }
    if (validateCustomerRegistration(req.body) == 1) {
      res.status(400).json({ message: "Invalid data type" });
    }
    // Check if customer already exists
    if (Customer.findOne({ phone_number })) {
      res.status(400).json({ message: "Customer already exists" });
    }
    // Calculate approved limit
    const approved_limit = Math.round(36 * monthly_income);

    // Create new customer in database
    const newCustomer = await Customer.create({
      first_name,
      last_name,
      age,
      monthly_income,
      phone_number,
      approved_limit,
    });
    // Send response
    res.status(201).json(newCustomer);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerCustomer };
