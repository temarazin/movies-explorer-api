const router = require('express').Router();
const { getUser, updateUser, createUser } = require('../controllers/users');

// temp route
router.post('/', createUser);

router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;
