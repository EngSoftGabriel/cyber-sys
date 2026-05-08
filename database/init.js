const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../users.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

db.serialize(() => {
  // Criar tabela de usuários se não existir
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
    } else {
      console.log('Tabela de usuários criada/verificada com sucesso');
      
      // Inserir usuário padrão se não existir
      db.get('SELECT * FROM users WHERE username = ?', ['gabriel almeida'], (err, row) => {
        if (err) {
          console.error('Erro ao verificar usuário:', err);
        } else if (!row) {
          const hashedPassword = bcrypt.hashSync('123456', 10);
          db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            ['gabriel almeida', 'gabriel@example.com', hashedPassword],
            (err) => {
              if (err) {
                console.error('Erro ao inserir usuário padrão:', err);
              } else {
                console.log('Usuário padrão criado: gabriel almeida / 123456');
              }
            }
          );
        }
      });
    }
  });
});

module.exports = db;
