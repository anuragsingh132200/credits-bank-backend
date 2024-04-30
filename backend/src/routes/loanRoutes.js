const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

// Route to create a new loan
router.post("/create-loan", loanController.createLoan);

// Route to check loan eligibility
router.post("/check-eligibility", loanController.checkEligibility);

// Route to view loan details
router.get("/view-loan/:loan_id", loanController.viewLoan);

module.exports = router;
