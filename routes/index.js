const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidRoutes');


const express = require('express');
const router = express.Router()

router.use('/playlists', playlistRoutes);
router.use('/users', userRoutes);
router.use('/kids', kidRoutes);

module.exports = router;

