const express = require("express");
const {
    getDepartureById,
    getDepartures,
    updateDeparture,
} = require("./departure.controller.js");
const router = express.Router();

router.get("/", getDepartures);
router.get("/:id", getDepartureById);
router.put("/:id", updateDeparture);

module.exports = router;
