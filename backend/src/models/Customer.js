const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Customer = sequelize.define(
  "Customer",
  {
    // Define attributes
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthly_income: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    approved_limit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    // Define options
  }
);

module.exports = Customer;
