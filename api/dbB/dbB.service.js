const dbService = require('../../services/dbB.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('records')
        var dbBs = await collection.find().toArray()
        return dbBs[0]
    } catch (err) {
        logger.error('cannot find dbBs', err)
        throw err
    }
}

async function getById(dbBId) {
    try {
        const collection = await dbService.getCollection('task')
        const dbB = collection.findOne({ _id: ObjectId(dbBId) })
        return dbB
    } catch (err) {
        logger.error(`while finding dbB ${dbBId}`, err)
        throw err
    }
}

async function remove(dbBId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ _id: ObjectId(dbBId) })
        return dbBId
    } catch (err) {
        logger.error(`cannot remove dbB ${dbBId}`, err)
        throw err
    }
}

async function add(dbB) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.insertOne(dbB)
        return dbB
    } catch (err) {
        logger.error('cannot insert dbB', err)
        throw err
    }
}

async function update(dbB) {
    try {
        const dbBToSave = {
            vendor: dbB.vendor,
            price: dbB.price
        }
        const collection = await dbService.getCollection('dbB')
        await collection.updateOne({ _id: ObjectId(dbB._id) }, { $set: dbBToSave })
        return dbB
    } catch (err) {
        logger.error(`cannot update dbB ${dbBId}`, err)
        throw err
    }
}

async function addDbBMsg(dbBId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('dbB')
        await collection.updateOne({ _id: ObjectId(dbBId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add dbB msg ${dbBId}`, err)
        throw err
    }
}

async function removeDbBMsg(dbBId, msgId) {
    try {
        const collection = await dbService.getCollection('dbB')
        await collection.updateOne({ _id: ObjectId(dbBId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add dbB msg ${dbBId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addDbBMsg,
    removeDbBMsg
}
