const express = require('express');
const router = express.Router();


const { debit_account, credit_account, get_transactions, get_a_transaction } = require("../controllers/transaction_controller")
const { auth }  = require("../middlewares/auth");


router.post('/debit',auth,debit_account);
router.post('/credit', auth, credit_account);
router.post('/all', auth,get_transactions);
router.get('/:transaction_id',auth,get_a_transaction);

module.exports = router;