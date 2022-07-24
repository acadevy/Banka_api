const express = require('express');
const router = express.Router();

const { create_account }  = require('../controllers/account_controller');
const { auth } = require ("../middlewares/auth");

router.post('/create_account',auth, create_account);

module.exports = router;