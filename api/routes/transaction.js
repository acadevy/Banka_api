const express = require('express');
const router = express.Router();


const { debit_account } = require("../controllers/transaction_controller")
const { auth }  = require("../middlewares/auth");


router.post('/debit/:id',auth,debit_account);

module.exports = router;