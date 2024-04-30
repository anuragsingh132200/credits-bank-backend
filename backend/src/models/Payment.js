const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Payment = sequelize.define(
  "Payment",
  {
    // Define attributes
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Define options
  }
);

module.exports = Payment;
