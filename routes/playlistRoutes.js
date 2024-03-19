const express = require('express');
const router = express.Router()

const {
    playlistPatch,
    playlistPost,
    playlistPostVideo,
    playlistGet,
    playlistGetAll,
    playlistDelete,
    playlistDeleteVideo
  } = require("../controllers/playlistController.js");

router.get("/:id", playlistGet);
router.get("/", playlistGetAll);
router.post("/", playlistPost); //Creates a playlist
router.post("/:id", playlistPostVideo); //Creates a video in a playlist
router.patch("/:id", playlistPatch);
router.put("/:id", playlistPatch);
router.delete("/:id", playlistDelete);
router.delete("/:id/:videoId", playlistDeleteVideo);


module.exports = router;