const express = require('express');
const router = express.Router()

const {
    kidPatch,
    kidPost,
    kidGet,
    kidCompare,
    kidGetAll,
    kidDelete
  } = require("../controllers/kidController.js");

router.get("/:id", kidGet);
router.get("/compare/:id/:pin", kidCompare);
router.get("/user/:userId", kidGetAll);
router.post("/", kidPost);
router.patch("/:id", kidPatch);
router.put("/:id", kidPatch);
router.delete("/:id", kidDelete);

module.exports = router;