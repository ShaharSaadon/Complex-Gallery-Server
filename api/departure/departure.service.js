const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

async function query() {
    try {
        const collection = await dbService.getCollection("departure");
        var departures = await collection.find().toArray();
        return departures;
    } catch (err) {
        console.log("cannot find departures", err);
        throw err;
    }
}

async function getById(departureId) {
    try {
        const collection = await dbService.getCollection("departure");
        const departure = await collection.findOne({
            _id: new ObjectId(departureId),
        });
        return departure;
    } catch (err) {
        console.log(`while finding departure ${departureId}`, err);
        throw err;
    }
}

async function update(departure) {
    try {
        const collection = await dbService.getCollection("departure");
        await collection.updateOne(
            { _id: new ObjectId(departure._id) },
            {
                $set: {
                    name: departure.name,
                    picture: departure.picture,
                },
            }
        );
        return departure;
    } catch (err) {
        console.log(`while updating departure ${departure._id}`, err);
        throw err;
    }
}

module.exports = {
    query,
    getById,
    update,
};
