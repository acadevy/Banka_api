const express = require('express');
const router = express.Router();


const { debit_account, credit_account } = require("../controllers/transaction_controller")
const { auth }  = require("../middlewares/auth");


router.post('/debit',auth,debit_account);
router.post('/credit/:id', auth, credit_account);

module.exports = router;