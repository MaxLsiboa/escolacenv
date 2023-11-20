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

// Middleware de autenticação para verificar se o usuário está logado
function authenticateUser(req, res, next) {
  // Adicione lógica de autenticação aqui
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

// Rota para a página de login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/views/login.html');
});

// Rota para processar o login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifique as credenciais no banco de dados
connection.query(
  'SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password],
  (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.redirect('/login');
      return;
    }

    console.log('Resultado da consulta:', results);

    if (results.length > 0) {
      // Crie uma sessão para armazenar o usuário logado
      req.session.user = results[0];

      // Redirecione para a página do aluno (ou qualquer página central)
      res.redirect('/aluno');
    } else {
      res.redirect('/login');
    }
  }
);

// Rota para a página do aluno (requer autenticação)
app.get('/aluno', authenticateUser, (req, res) => {
  res.sendFile(__dirname + '/public/views/aluno.html');
});

// Rota para a página do professor (requer autenticação)
app.get('/professor', authenticateUser, (req, res) => {
  res.sendFile(__dirname + '/public/views/professor.html');
});

// Rota para a página do administrador (requer autenticação)
app.get('/admin', authenticateUser, (req, res) => {
  // Verifique se o usuário autenticado é um administrador
  if (req.session.user && req.session.user.role === 'admin') {
    console.log('Usuário autenticado como administrador:', req.session.user.username);
    res.sendFile(__dirname + '/public/scripts/admin.html');
  } else {
    console.log('Usuário não autenticado como administrador. Redirecionando para /login');
    res.redirect('/login'); // ou res.redirect('/');
  }
});

// Rota para fazer logout
app.get('/logout', (req, res) => {
  // Destrua a sessão para fazer logout
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
    }
    res.redirect('/');
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Rota para adicionar um aluno (requer autenticação de administrador)
app.post('/addAluno', authenticateUser, (req, res) => {
  // Verifique se o usuário autenticado é um administrador
  if (req.session.user && req.session.user.role === 'admin') {
    const { nome, matricula, curso } = req.body;

    // Adicione lógica para inserir o aluno no banco de dados
    connection.query(
      'INSERT INTO alunos (nome, matricula, curso) VALUES (?, ?, ?)',
      [nome, matricula, curso],
      (err, results) => {
        if (err) {
          console.error('Erro ao adicionar aluno:', err);
          res.redirect('/admin');
        } else {
          res.redirect('/admin');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

// Rota para visualizar todos os alunos (requer autenticação de administrador)
app.get('/viewAlunos', authenticateUser, (req, res) => {
  // Verifique se o usuário autenticado é um administrador
  if (req.session.user && req.session.user.role === 'admin') {
    // Adicione lógica para buscar todos os alunos no banco de dados
    connection.query('SELECT * FROM alunos', (err, results) => {
      if (err) {
        console.error('Erro ao buscar alunos:', err);
        res.redirect('/admin');
      } else {
        res.render('viewAlunos', { alunos: results });
      }
    });
  } else {
    res.redirect('/');
  }
});

// Rota para remover um aluno (requer autenticação de administrador)
app.post('/removeAluno', authenticateUser, (req, res) => {
  // Verifique se o usuário autenticado é um administrador
  if (req.session.user && req.session.user.role === 'admin') {
    const { alunoId } = req.body;

    // Adicione lógica para remover o aluno do banco de dados
    connection.query(
      'DELETE FROM alunos WHERE id = ?',
      [alunoId],
      (err, results) => {
        if (err) {
          console.error('Erro ao remover aluno:', err);
          res.redirect('/admin');
        } else {
          res.redirect('/admin');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});
