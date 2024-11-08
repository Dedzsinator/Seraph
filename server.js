const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import the CORS package

const app = express();
const port = 3000;

// Configure CORS to allow requests from all origins (or restrict to specific origins)
app.use(cors());

const dbConfig = {
  user: 'sa',
  password: 'Deginandor21',
  server: '127.0.0.1', // Adjust if using a different host or IP address
  database: 'Seraph',
  options: {
    encrypt: false, // Set to true if using encryption
    trustServerCertificate: true,
  },
};

// Endpoint to execute SQL query
app.get('/query', async (req, res) => {
  const { query } = req.query;

  try {
    // Log the received query
    console.log('Received query:', query);

    // Connect to the database
    const pool = await sql.connect(dbConfig);

    // Run the query
    const result = await pool.request().query(query);

    // Log the query results
    console.log('Query results:', result.recordset);

    // Close the connection
    await sql.close();

    // Send the result as JSON
    res.json(result.recordset);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});