const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Loan = sequelize.define(
  "Loan",
  {
    // Define attributes
    loan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loan_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    interest_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tenure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approval_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    monthly_installment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    // Define options
  }
);

module.exports = Loan;
