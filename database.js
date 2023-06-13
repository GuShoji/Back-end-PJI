const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: 'emenda',
  password:'dados23',
  host: '82.180.139.132',
  database: 'banco_emenda'
});

try {
  connection.connect();
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}

module.exports = connection;