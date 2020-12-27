const express = require('express');
//creamos una variable router para almasenar el metodo Router
const router = express.Router();

router.get('./src', (req, res) => {
    res.send('Index');
});

module.exports = router;