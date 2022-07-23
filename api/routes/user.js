const express = require('express');
const { signup, signin } = require('../controllers/user_controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/validator');
const router = express.Router();


router.post('/signup',validateSignupRequest, isRequestValidated, signup);
// router.post('/signin',validateSigninRequest, isRequestValidated, signin);

module.exports = router;