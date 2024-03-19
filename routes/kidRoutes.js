const express = require('express');
const router = express.Router()

const {
    KidPatch,
    KidPost,
    KidGet,
    KidGetAll,
    KidDelete
  } = require("../controllers/kidController.js");

router.get("/:id", KidGet);
router.get("/", KidGetAll);
router.post("/", KidPost);
router.patch("/:id", KidPatch);
router.put("/:id", KidPatch);
router.delete("/:id", KidDelete);

module.exports = router;