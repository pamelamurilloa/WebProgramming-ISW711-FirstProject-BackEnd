const videoRoutes = require('./videoRoutes');
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidRoutes');


const express = require('express');
const router = express.Router()

router.use('/videos', videoRoutes);
router.use('/users', userRoutes);
router.use('/kids', kidRoutes);

module.exports = router;

