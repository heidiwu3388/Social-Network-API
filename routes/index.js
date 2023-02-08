const router = require('express').Router();
const apiRoutes = require('./api');

// route /api requests to apiRoutes
router.use('/api', apiRoutes);

// sent error message for all other invalid requests
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
