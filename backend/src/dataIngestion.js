// dataIngestion.js

const XLSX = require('xlsx');

// Define function to read and process customer data from Excel file
const ingestCustomerData = () => {
  try {
    const workbook = XLSX.readFile("C:\\Users\\anura\\OneDrive\\Desktop\\intern tasks\\almeno\\backend\\src\\data\\customer_data.xlsx");
    const customerDataSheet = workbook.Sheets[workbook.SheetNames[0]];
    const customerData = XLSX.utils.sheet_to_json(customerDataSheet);
    
  } catch (error) {
    console.error('Error ingesting customer data:', error);
  }
};

// Define function to read and process loan data from Excel file
const ingestLoanData = () => {
  try {
    const workbook = XLSX.readFile('C:\\Users\\anura\\OneDrive\\Desktop\\intern tasks\\almeno\\backend\\src\\data\\loan_data.xlsx');
    const loanDataSheet = workbook.Sheets[workbook.SheetNames[0]];
    const loanData = XLSX.utils.sheet_to_json(loanDataSheet);
    
  } catch (error) {
    console.error('Error ingesting loan data:', error);
  }
};

module.exports = { ingestCustomerData, ingestLoanData };
