const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');
const { user: userValidator } = require('../utils/validator');

router.get('/me', getUser);
router.patch('/me', celebrate(userValidator.update), updateUser);

module.exports = router;
