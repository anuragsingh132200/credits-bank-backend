const Loan = require('../models/Loan'); // Import your Loan model

// Function to calculate credit score based on historical loan data
function calculateCreditScore(customerId) {
  // Filter loan data for the specified customer
  async function getCustomerLoans(customerId) {
    const customerLoans = await Loan.find({ customer_id: customerId });
    return customerLoans;
  }

  // Initialize variables for credit score components
  let paidOnTimeCount = 0;
  let totalLoanCount = customerLoans.length;
  let currentYearLoanCount = 0;
  let totalLoanAmountApproved = 0;

  // Calculate credit score components
  getCustomerLoans.forEach((loan) => {
    // Component 1: Past Loans paid on time
    if (loan.emis_paid_on_time === loan.tenure) {
      paidOnTimeCount++;
    }

    // Component 3: Loan activity in current year
    const loanStartDate = new Date(loan.start_date);
    const currentYear = new Date().getFullYear();
    if (loanStartDate.getFullYear() === currentYear) {
      currentYearLoanCount++;
    }

    // Component 4: Loan approved volume
    totalLoanAmountApproved += loan.loan_amount;
  });

  // Component 2: No of loans taken in past
  // Already calculated as totalLoanCount

  // Calculate credit score
  let creditScore = 0;

  // Implement logic to calculate credit score based on components mentioned in the requirements
  // You may adjust the weights and thresholds as needed
  creditScore += (paidOnTimeCount / totalLoanCount) * 30; // Component 1 weight: 30%
  creditScore += (totalLoanCount / 5) * 20; // Component 2 weight: 20%
  creditScore += (currentYearLoanCount / totalLoanCount) * 20; // Component 3 weight: 20%
  creditScore += (totalLoanAmountApproved / 5000000) * 20; // Component 4 weight: 20%

  return Math.round(creditScore); // Round credit score to nearest integer
}

// Function to check eligibility for a loan
function checkLoanEligibility(customerId, loanAmount, interestRate, tenure) {
  // Calculate credit score
  const creditScore = calculateCreditScore(customerId);

  // Check if sum of all current EMIs is greater than 50% of monthly salary
  // Implement logic to check sum of current EMIs

  // Determine loan approval status and interest rate based on credit score
  let approval = false;
  let correctedInterestRate = interestRate; // Default to original interest rate
  let monthlyInstallment = 0;
  let response = {};

  if (creditScore > 50) {
    approval = true;
    monthlyInstallment = calculateMonthlyInstallment(
      loanAmount,
      interestRate,
      tenure
    );
  } else if (creditScore > 30) {
    if (interestRate <= 12) {
      approval = true;
      correctedInterestRate = 12; // Correct interest rate to match the slab
      monthlyInstallment = calculateMonthlyInstallment(
        loanAmount,
        correctedInterestRate,
        tenure
      );
    }
  } else if (creditScore > 10) {
    if (interestRate <= 16) {
      approval = true;
      correctedInterestRate = 16; // Correct interest rate to match the slab
      monthlyInstallment = calculateMonthlyInstallment(
        loanAmount,
        correctedInterestRate,
        tenure
      );
    }
  }

  // Return loan approval status, interest rate, corrected interest rate, tenure, and monthly installment
  response.customer_id = customerId;
  response.approval = approval;
  response.interest_rate = interestRate;
  response.corrected_interest_rate = correctedInterestRate;
  response.tenure = tenure;
  response.monthly_installment = monthlyInstallment;

  return response;
}

// Function to calculate monthly installment based on loan amount, interest rate, and tenure
function calculateMonthlyInstallment(loanAmount, interestRate, tenure) {
  // Implement logic to calculate monthly installment (EMI)
  // EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1)
  const r = interestRate / (12 * 100); // Monthly interest rate
  const n = tenure; // Number of months
  const monthlyInstallment =
    (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return monthlyInstallment;
}

module.exports = {
  calculateCreditScore,
  checkLoanEligibility,
};
