const express = require('express');
const router = express.Router()

const {
    userPatch,
    userPost,
    userGet,
    userCompare,
    userGetAll,
    userDelete
  } = require("../controllers/userController.js");

router.get("/:id", userGet);
router.get("/:email/:password", userCompare);
router.get("/", userGetAll);
router.post("/", userPost);
router.patch("/:id", userPatch);
router.put("/:id", userPatch);
router.delete("/:id", userDelete);

module.exports = router;