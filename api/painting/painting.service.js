const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

async function query() {
    try {
        const collection = await dbService.getCollection("codes");
        var paintings = await collection.find().toArray();
        return paintings;
    } catch (err) {
        console.log("cannot find paintings", err);
        throw err;
    }
}

async function getById(paintingId) {
    try {
        const collection = await dbService.getCollection("codes");
        const painting = await collection.findOne({
            _id: new ObjectId(paintingId),
        });
        return painting;
    } catch (err) {
        console.log(`while finding painting ${paintingId}`, err);
        throw err;
    }
}

async function update(painting) {
    try {
        const collection = await dbService.getCollection("codes");
        await collection.updateOne(
            { _id: new ObjectId(painting._id) },
            {
                $set: {
                    title: painting.title,
                    code: painting.code,
                },
            }
        );
        return painting;
    } catch (err) {
        console.log(`while updating painting ${painting._id}`, err);
        throw err;
    }
}

module.exports = {
    query,
    getById,
    update,
};
