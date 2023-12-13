const paintingService = require("./painting.service.js");

async function getPaintings(req, res) {
    try {
        const paintings = await paintingService.query();
        res.json(paintings);
    } catch (err) {
        res.status(500).send({ err: "Failed to get paintings" });
    }
}

async function getPaintingById(req, res) {
    try {
        const paintingId = req.params.id;
        const painting = await paintingService.getById(paintingId);
        res.json(painting);
    } catch (err) {
        res.status(500).send({ err: "Failed to get painting" });
    }
}

async function updatePainting(req, res) {
    try {
        const painting = req.body;
        const updatedPainting = await paintingService.update(painting);
        res.json(updatedPainting);
    } catch (err) {
        console.log(err);
        res.status(500).send({ err: "Failed to update painting" });
    }
}

module.exports = {
    getPaintingById,
    getPaintings,
    updatePainting,
};
