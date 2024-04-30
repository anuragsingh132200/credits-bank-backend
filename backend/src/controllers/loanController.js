const Loan = require("../models/Loan");
const {
  calculateMonthlyInstallment,
  checkLoanEligibility,
} = require("../services/loanService");
const { validateLoanApplication } = require("../utils/validation");
// Controller function to create a new loan
const createLoan = async (req, res, next) => {
  try {
    // Retrieve request body
    const { customer_id, loan_amount, interest_rate, tenure } = req.body;

    // Validate request body
    if (validateLoanApplication(req.body) == 0) {
      res.status(400).json({ message: "missing feilds" });
    }
    if (validateLoanApplication(req.body) == 1) {
      res.status(400).json({ message: "invalid data type" });
    }

    // Create new loan in database
    const newLoan = await Loan.create({
      customer_id,
      loan_amount,
      interest_rate,
      tenure,
      approval_status: true, // Assuming loan is automatically approved
      monthly_installment: calculateMonthlyInstallment(
        loan_amount,
        interest_rate,
        tenure
      ),
    });

    // Send response
    res.status(201).json(newLoan);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to check loan eligibility
const checkEligibility = async (req, res, next) => {
  try {
    // Retrieve request body
    const { customer_id, loan_amount, interest_rate, tenure } = req.body;

    // Check loan eligibility
    const eligibilityResult = checkLoanEligibility(
      customer_id,
      loan_amount,
      interest_rate,
      tenure
    );

    // Send response
    res.status(200).json(eligibilityResult);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to view loan details
const viewLoan = async (req, res, next) => {
  try {
    // Retrieve loan id from request parameters
    const loanId = req.params.loan_id;

    // Find loan details from database
    const loan = await Loan.findByPk(loanId);

    // Check if loan exists
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Send response with loan details
    res.status(200).json(loan);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createLoan, checkEligibility, viewLoan };
