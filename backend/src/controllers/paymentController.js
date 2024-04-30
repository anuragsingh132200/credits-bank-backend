const Payment = require("../models/Payment");
const Loan = require("../models/Loan");
const { calculateMonthlyInstallment } = require("../services/loanService");

// Controller function to make a payment towards an EMI
const makePayment = async (req, res, next) => {
  try {
    // Retrieve parameters from URL and request body
    const { customer_id, loan_id } = req.params;
    const { amount } = req.body;

    // Retrieve loan details
    const loan = await Loan.findByPk(loan_id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Calculate remaining principal amount after payment
    const remainingPrincipal = loan.loan_amount - amount;

    // Recalculate EMI if amount paid is less/more than due installment amount
    let monthlyInstallment = loan.monthly_installment;
    if (amount !== loan.monthly_installment) {
      monthlyInstallment = calculateMonthlyInstallment(
        remainingPrincipal,
        loan.interest_rate,
        loan.tenure
      );
    }

    // Create new payment entry in database
    const newPayment = await Payment.create({
      customer_id,
      loan_id,
      amount,
      payment_date: new Date(), // Assuming payment date is current date
    });

    // Send response
    res.status(201).json({
      newPayment,
      monthlyInstallment,
    });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to view statement of a particular loan
const viewStatement = async (req, res, next) => {
  try {
    // Retrieve parameters from URL
    const { customer_id, loan_id } = req.params;

    // Retrieve payment details from database
    const payments = await Payment.findAll({
      where: { customer_id, loan_id },
      attributes: [
        "payment_id",
        "customer_id",
        "loan_id",
        "amount",
        "payment_date",
      ],
    });

    // Send response
    res.status(200).json(payments);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { makePayment, viewStatement };
