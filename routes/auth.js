const router = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { auth: authValidator } = require('../utils/validator');

router.post('/signin', celebrate(authValidator.signIn), login);
router.post('/signup', celebrate(authValidator.signUp), createUser);

module.exports = router;
