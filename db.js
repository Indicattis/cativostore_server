const mysql = require ("mysql")

const db = mysql.createConnection({
    host: 'thelordbarber.cbmth66g8ff4.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'd3vl1n3w3b',
    database: 'cativostore',
  });

  db.connect((error) => {
    if (error) {
        console.error('Erro na conexão com o banco de dados:', error);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = db;