const router = require('express').Router();
const thoughts = require('./thoughts');
const user = require('./user');

router.use('/thought', thoughts);
router.use('/user', user);

module.exports = router;
