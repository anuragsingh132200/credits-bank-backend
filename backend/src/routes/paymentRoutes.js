const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to make a payment towards an EMI
router.post(
  "/make-payment/:customer_id/:loan_id",
  paymentController.makePayment
);

// Route to view statement of a particular loan
router.get(
  "/view-statement/:customer_id/:loan_id",
  paymentController.viewStatement
);

module.exports = router;
