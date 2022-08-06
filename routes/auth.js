const authRouter = require('express').Router();
const logoutRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, logout, createUser } = require('../controllers/users');
const { auth: authValidator } = require('../utils/validator');

authRouter.post('/signin', celebrate(authValidator.signIn), login);
authRouter.post('/signup', celebrate(authValidator.signUp), createUser);
logoutRouter.post('/logout', logout);

module.exports = { authRouter, logoutRouter };
