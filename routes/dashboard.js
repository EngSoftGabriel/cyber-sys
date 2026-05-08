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

module.exports = router;
