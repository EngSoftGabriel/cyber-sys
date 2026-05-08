const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// Rota protegida do dashboard
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'Hello World',
    user: req.username
  });
});

// Rota para servir a página do dashboard
router.get('/dashboard-page', verifyToken, (req, res) => {
  res.sendFile(__dirname + '/../public/dashboard.html');
});

// Rota para consultar APIs públicas do Brasil
router.get('/brasil', verifyToken, async (req, res) => {
  const { type, query, state } = req.query;

  if (!type) {
    return res.status(400).json({ message: 'O tipo de consulta é obrigatório' });
  }

  let url;

  switch (type) {
    case 'cep':
      if (!query) {
        return res.status(400).json({ message: 'CEP é obrigatório' });
      }
      url = `https://brasilapi.com.br/api/cep/v2/${encodeURIComponent(query)}`;
      break;
    case 'ddd':
      if (!query) {
        return res.status(400).json({ message: 'DDD é obrigatório' });
      }
      url = `https://brasilapi.com.br/api/ddd/v1/${encodeURIComponent(query)}`;
      break;
    case 'bancos':
      url = 'https://brasilapi.com.br/api/banks/v1';
      break;
    case 'cnpj':
      if (!query) {
        return res.status(400).json({ message: 'CNPJ é obrigatório' });
      }
      url = `https://brasilapi.com.br/api/cnpj/v1/${encodeURIComponent(query)}`;
      break;
    case 'feriados':
      if (!query) {
        return res.status(400).json({ message: 'Ano é obrigatório para feriados' });
      }
      url = `https://brasilapi.com.br/api/feriados/v1/${encodeURIComponent(query)}`;
      if (state) {
        url += `?estado=${encodeURIComponent(state)}`;
      }
      break;
    default:
      return res.status(400).json({ message: 'Tipo de consulta inválido' });
  }

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar a API externa', error: error.message });
  }
});

module.exports = router;
