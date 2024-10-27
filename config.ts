const config = {
    user: 'sa',
    password: 'Deginandor21!',
    server: 'localhost',  // Use '127.0.0.1' or your IP if localhost doesn’t work         // Default port for SQL Server
    database: 'Seraph',
    options: {
        encrypt: false,    // SQL Server requires this to be false if there is no SSL
        trustServerCertificate: true
    },
};

//example query
/*
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
*/

export default config;