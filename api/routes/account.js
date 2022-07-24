const express = require('express');
const router = express.Router();

const { create_account, deactivate_account}  = require('../controllers/account_controller');
const { auth } = require ("../middlewares/auth");

router.post('/create_account/:id',auth, create_account);
router.post('/update_status/:account_id',auth,deactivate_account);

module.exports = router;