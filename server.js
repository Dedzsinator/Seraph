const sql = require('mssql');

const config = {
  user: 'sa', // Your SQL Server username
  password: 'Deginandor21!', // Your SQL Server password
  server: '127.0.0.1',
  database: 'Seraph',
  options: {
    encrypt: false, // Use encryption (if necessary)
    trustServerCertificate: true // Change to false in production
  }
};

sql.connect(config)
  .then(pool => {
    return pool.request().query('SELECT * FROM Test');
  })
  .then(result => {
    console.log(result.recordset);
  })
  .catch(err => {
    console.log('SQL error:', err);
  })
  .then(() => {
    console.log('SQL connection closed.');
    sql.close();
  });
