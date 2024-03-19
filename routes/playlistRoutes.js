const express = require('express');
const router = express.Router()

const {
    playlistPatch,
    playlistPost,
    playlistGet,
    playlistGetAll,
    playlistDelete
  } = require("../controllers/playlistController.js");

router.get("/:id", playlistGet);
router.get("/", playlistGetAll);
router.post("/", playlistPost); //Creates a pllaylist
router.post("/:id", playlistPost); //Creates a video in a playlist
router.patch("/:id", playlistPatch);
router.put("/:id", playlistPatch);
router.delete("/:id", playlistDelete);

module.exports = router;