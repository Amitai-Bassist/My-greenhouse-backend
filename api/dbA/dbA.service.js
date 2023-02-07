const { log } = require('../../middlewares/logger.middleware')
const dbAService = require('../../services/dbA.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbAService.getCollection('records')
        var dbAs = await collection.find().toArray()
        return dbAs[0]
    } catch (err) {
        logger.error('cannot find dbAs', err)
        throw err
    }
}

async function getById(dbAId) {
    try {
        const collection = await dbAService.getCollection('records')
        const dbA = collection.findOne({ _id: ObjectId(dbAId) })
        return dbA
    } catch (err) {
        logger.error(`while finding dbA ${dbAId}`, err)
        throw err
    }
}

async function remove(dbAId) {
    try {
        const collection = await dbAService.getCollection('records')
        await collection.deleteOne({ _id: ObjectId(dbAId) })
        return dbAId
    } catch (err) {
        logger.error(`cannot remove dbA ${dbAId}`, err)
        throw err
    }
}

async function add(dbA) {
    try {
        const collection = await dbAService.getCollection('records')
        await collection.insertOne(dbA)
        return dbA
    } catch (err) {
        logger.error('cannot insert dbA', err)
        throw err
    }
}

async function update(dbA) {
    try {
        const dbAToSave = {
            vendor: dbA.vendor,
            price: dbA.price
        }
        const collection = await dbAService.getCollection('records')
        await collection.updateOne({ _id: ObjectId(dbA._id) }, { $set: dbAToSave })
        return dbA
    } catch (err) {
        logger.error(`cannot update dbA ${dbAId}`, err)
        throw err
    }
}

async function addDbAMsg(dbAId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbAService.getCollection('records')
        await collection.updateOne({ _id: ObjectId(dbAId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add dbA msg ${dbAId}`, err)
        throw err
    }
}

async function removeDbAMsg(dbAId, msgId) {
    try {
        const collection = await dbAService.getCollection('records')
        await collection.updateOne({ _id: ObjectId(dbAId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add dbA msg ${dbAId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addDbAMsg,
    removeDbAMsg
}
