const app = require("./app");
const dataIngestion = require("./dataIngestion"); // Import data ingestion script
const PORT = process.env.PORT || 3000;

// Call the data ingestion functions
dataIngestion.ingestCustomerData();
dataIngestion.ingestLoanData();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
