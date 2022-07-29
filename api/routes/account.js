const express = require('express');
const router = express.Router();

const { create_account, deactivate_account,get_all_account, get_an_account, delete_account, updated_account_balance}  = require('../controllers/account_controller');
const { auth } = require ("../middlewares/auth");

router.post('/create_account/:id',auth, create_account);
router.post('/update_status/:account_id',auth,deactivate_account);
router.post('/get_accounts', auth, get_all_account);
router.get('/:accountNo',auth,get_an_account);
router.delete('/:accountNo',auth, delete_account);
router.post('/:id', auth,updated_account_balance)

module.exports = router;