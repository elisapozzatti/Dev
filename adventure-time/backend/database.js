const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'database-2.cjuqqg0wajgi.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AdventureTime', 
  database: 'AIcareHUB'
});

(async () => {
  try {
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('Connesso al database! Risultato della query di test:', rows);
  } catch (error) {
    console.error('Errore di connessione al database:', error);
  }
})();

module.exports = connection;