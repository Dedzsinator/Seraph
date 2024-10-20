const sql = require('mssql');

// SQL Server configuration
const config = {
  user: 'sa',
  password: 'Deginandor21!',
  server: 'localhost',
  database: 'Seraph',
  options: {
    encrypt: false, // Azure encryption if needed
    trustServerCertificate: true // For self-signed certificates
  }
};

// Connect to MSSQL
const connectToDB = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to MSSQL Server');
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
};

// Call this method when needed
connectToDB();

module.exports = { connectToDB };
