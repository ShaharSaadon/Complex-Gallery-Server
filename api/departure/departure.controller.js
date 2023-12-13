const departureService = require("./departure.service.js");

async function getDepartures(req, res) {
    try {
        const departures = await departureService.query();
        res.json(departures);
    } catch (err) {
        res.status(500).send({ err: "Failed to get departures" });
    }
}

async function getDepartureById(req, res) {
    try {
        const departureId = req.params.id;
        const departure = await departureService.getById(departureId);
        res.json(departure);
    } catch (err) {
        res.status(500).send({ err: "Failed to get departure" });
    }
}

async function updateDeparture(req, res) {
    try {
        const departure = req.body;
        const updatedDeparture = await departureService.update(departure);
        res.json(updatedDeparture);
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Failed to update departure" });
    }
}

module.exports = {
    getDepartureById,
    getDepartures,
    updateDeparture,
};
