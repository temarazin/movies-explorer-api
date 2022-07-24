const router = require('express').Router();

router.get('/me', (req, res) => {
  res.send({ message: 'ok' });
});
router.patch('/me', () => {});

module.exports = router;
