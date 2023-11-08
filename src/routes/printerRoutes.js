const express = require('express');
const router = express.Router();
const { createPrinter } = require('../controllers/printerController');

router.post('/register', createPrinter);

module.exports = router;
