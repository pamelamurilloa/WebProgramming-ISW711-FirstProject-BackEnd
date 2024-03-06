const express = require('express');
const router = express.Router()

const {
    videoPatch,
    videoPost,
    videoGet,
    videoGetAll,
    videoDelete
  } = require("../controllers/videoController.js");

router.get("/:id", videoGet);
router.get("/", videoGetAll);
router.post("/", videoPost);
router.patch("/:id", videoPatch);
router.put("/:id", videoPatch);
router.delete("/:id", videoDelete);

module.exports = router;