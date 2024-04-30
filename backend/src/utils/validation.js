// Validate customer data before registration
const validateCustomerRegistration = (data) => {
  const { first_name, last_name, age, monthly_income, phone_number } = data;
  if (!first_name || !last_name || !age || !monthly_income || !phone_number) {
    return 0; //missing feilds
  }
  if (
    typeof age !== "number" ||
    typeof monthly_income !== "number" ||
    typeof phone_number !== "number"
  ) {
    return 1; //wrong type of fields
  }
  return 2;
};

// Validate loan application data
const validateLoanApplication = (data) => {
  const { customer_id, loan_amount, interest_rate, tenure } = data;
  if (!customer_id || !loan_amount || !interest_rate || !tenure) {
    return 0; //missing feilds
  }
  if (
    typeof customer_id !== "number" ||
    typeof loan_amount !== "number" ||
    typeof interest_rate !== "number" ||
    typeof tenure !== "number"
  ) {
    return 1; //wrong type of fields
  }
  return 2;
};

module.exports = {
  validateCustomerRegistration,
  validateLoanApplication,
};
