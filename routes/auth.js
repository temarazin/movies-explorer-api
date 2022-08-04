const router = require('express').Router();
const { celebrate } = require('celebrate');
const { login, logout, createUser } = require('../controllers/users');
const { auth: authValidator } = require('../utils/validator');

router.post('/signin', celebrate(authValidator.signIn), login);
router.post('/signup', celebrate(authValidator.signUp), createUser);
router.post('/logout', logout);

module.exports = router;
