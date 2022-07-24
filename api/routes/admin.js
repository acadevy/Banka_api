const express = require('express');
const { signup, signin, get_a_user, update_user,signout } = require('../controllers/admin_controller');
const { auth,user_middleware, super_admin_middleware} = require("../middlewares/auth")
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/validator');
const router = express.Router();


router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
router.get('/:id', get_a_user);
router.put('/update_admin',auth, super_admin_middleware, update_user);
router.post('/signout', auth,signout);


module.exports = router;