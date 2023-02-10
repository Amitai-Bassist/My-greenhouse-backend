const dbBService = require('./dbB.service.js')

const logger = require('../../services/logger.service')

async function getDbBs(req, res) {
  try {
    logger.debug('Getting DbBs')
    const dbBs = await dbBService.query()
    res.json(dbBs)
  } catch (err) {
    logger.error('Failed to get dbBs', err)
    res.status(500).send({ err: 'Failed to get dbBs' })
  }
}

async function getDbBById(req, res) {
  try {
    const dbBId = req.params.id
    const dbB = await dbBService.getById(dbBId)
    res.json(dbB)
  } catch (err) {
    logger.error('Failed to get dbB', err)
    res.status(500).send({ err: 'Failed to get dbB' })
  }
}

async function addDbB(req, res) {
  const {loggedinUser} = req

  try {
    const dbB = req.body
    dbB.owner = loggedinUser
    const addedDbB = await dbBService.add(dbB)
    res.json(addedDbB)
  } catch (err) {
    logger.error('Failed to add dbB', err)
    res.status(500).send({ err: 'Failed to add dbB' })
  }
}


async function updateDbB(req, res) {
  try {
    const dbB = req.body
    const updatedDbB = await dbBService.update(dbB)
    res.json(updatedDbB)
  } catch (err) {
    logger.error('Failed to update dbB', err)
    res.status(500).send({ err: 'Failed to update dbB' })

  }
}


module.exports = {
  getDbBs,
  getDbBById,
  addDbB,
  updateDbB,
}
