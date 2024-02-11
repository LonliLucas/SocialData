const router = require('express').Router();
const thoughts = require('./thoughts');
const users = require('./users');

router.use('/thought', thoughts);
router.use('/user', users);

module.exports = router;
