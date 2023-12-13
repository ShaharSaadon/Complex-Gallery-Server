const express = require("express");
const {
    getPaintingById,
    getPaintings,
    updatePainting,
} = require("./painting.controller.js");
const router = express.Router();

router.get("/", getPaintings);
router.get("/:id", getPaintingById);
router.put("/:id", updatePainting);

module.exports = router;
