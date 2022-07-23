const express = require('express');
const { signup, signin, get_a_user, update_user } = require('../controllers/user_controller');
const { auth,user_middleware} = require("../middlewares/auth")
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/validator');
const router = express.Router();


router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
router.get('/:id', get_a_user);
router.post('/update_user',auth, update_user);

module.exports = router;