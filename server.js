require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database/init');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);

// Rota raiz - servir página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`\n📝 Credenciais padrão:`);
  console.log(`   Login: gabriel almeida`);
  console.log(`   Senha: 123456\n`);
});

// Tratamento de erros
process.on('SIGINT', () => {
  console.log('\n\nEncerrando servidor...');
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar banco de dados:', err);
    }
    process.exit(0);
  });
});
