# Cyber SaaS - Sistema de Autenticação com JWT

Um SaaS completo construído com Express.js, JWT e banco de dados SQLite, com autenticação segura e tela de login.

## 🚀 Recursos

- ✅ Autenticação com JWT (JSON Web Token)
- ✅ Criptografia de senhas com bcryptjs
- ✅ Banco de dados SQLite
- ✅ Tela de login responsiva
- ✅ Dashboard protegido
- ✅ API RESTful
- ✅ Middleware de autenticação

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. **Clonar ou abrir o repositório**

   ```bash
   cd cyber-sys
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**

   O arquivo `.env` já vem configurado com valores padrão. Para produção, altere:

   ```
   PORT=3000
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   NODE_ENV=development
   ```

## 🎯 Iniciar o Servidor

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

### Modo Produção

```bash
npm start
```

O servidor será iniciado em: **http://localhost:3000**

## 📝 Credenciais Padrão

- **Usuário:** gabriel almeida
- **Senha:** 123456

## 📂 Estrutura do Projeto

```
cyber-sys/
├── public/
│   ├── index.html           # Tela de login
│   └── dashboard.html       # Dashboard após login
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   └── dashboard.js         # Rotas protegidas
├── middleware/
│   └── auth.js              # Middleware JWT
├── database/
│   └── init.js              # Inicialização do banco de dados
├── server.js                # Servidor principal
├── package.json             # Dependências
├── .env                     # Variáveis de ambiente
└── README.md                # Este arquivo
```

## 🔐 Segurança

### O que foi implementado:

1. **JWT (JSON Web Token)**: Tokens com expiração de 24h
2. **Bcryptjs**: Criptografia de senhas com salt rounds
3. **Middleware de Autenticação**: Proteção de rotas sensíveis
4. **CORS**: Pronto para ser adicionado quando necessário
5. **Variáveis de Ambiente**: Chaves sensíveis protegidas

## 📡 API Endpoints

### Autenticação

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "gabriel almeida",
  "password": "123456"
}
```

**Resposta (Sucesso):**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "gabriel almeida",
    "email": "gabriel@example.com"
  }
}
```

#### Registrar Novo Usuário
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "novo_usuario",
  "email": "user@example.com",
  "password": "senha123"
}
```

### Rotas Protegidas

#### Dashboard
```
GET /api/dashboard
Authorization: Bearer <seu_token>
```

**Resposta:**
```json
{
  "message": "Hello World",
  "user": "gabriel almeida"
}
```

## 🎨 Customização

Você pode personalizar o projeto conforme necessário:

1. **Tela de Login**: Editar `public/index.html`
2. **Dashboard**: Editar `public/dashboard.html`
3. **Rotas**: Adicionar novas rotas em `routes/`
4. **Banco de Dados**: Modificar estrutura em `database/init.js`
5. **Variáveis de Ambiente**: Atualizar em `.env`

## 🐛 Troubleshooting

### Erro: "Database is locked"
- Feche outras instâncias do servidor
- Verifique se o arquivo `users.db` não está corrompido

### Erro: "JWT Secret não definido"
- Verifique se o arquivo `.env` existe
- Confirme se `JWT_SECRET` está configurado

### Porta 3000 em uso
- Mude a porta em `.env`: `PORT=3001`
- Ou finalize o processo usando a porta 3000

## 📚 Dependências

- **express**: Framework web
- **jsonwebtoken**: Geração e validação de JWT
- **bcryptjs**: Criptografia de senhas
- **sqlite3**: Banco de dados
- **dotenv**: Gerenciamento de variáveis de ambiente
- **nodemon**: Auto-reload em desenvolvimento

## 🚀 Próximos Passos

- [ ] Adicionar validação de email
- [ ] Implementar recuperação de senha
- [ ] Adicionar 2FA (Two-Factor Authentication)
- [ ] Criar dashboard com mais funcionalidades
- [ ] Adicionar testes automatizados
- [ ] Implementar rate limiting
- [ ] Adicionar logging

## 📄 Licença

ISC

## 👤 Autor

Projeto criado com ❤️

---

**Dúvidas?** Customize o projeto conforme necessário!
