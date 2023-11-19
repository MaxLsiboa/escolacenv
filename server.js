const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Middleware para análise de corpo
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados MariaDB
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'lisboa',
  database: 'Escola-cenv'
});

// Conexão com o banco de dados
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados!');
  }
});

// Rota para a página de login do administrador
app.post('/login_admin', (req, res) => {
  const { username, password } = req.body;

  // Verifique as credenciais no banco de dados
  connection.query(
    'SELECT * FROM admin_users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.redirect('/login_admin');
        return;
      }

      if (results.length > 0) {
        // Redirecione para admin.html após a autenticação bem-sucedida
        res.redirect('/admin.html');
      } else {
        // Caso contrário, redirecione de volta para a página de login
        res.redirect('/login_admin');
      }
    }
  );
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
