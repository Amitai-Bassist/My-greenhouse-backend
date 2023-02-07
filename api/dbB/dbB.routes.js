const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getDbBs, getDbBById, addDbB, updateDbB, removeDbB, addDbBMsg, removeDbBMsg } = require('./dbB.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getDbBs)
router.get('/:id', getDbBById)
router.post('/', addDbB)
router.put('/:id', updateDbB)
router.delete('/:id', removeDbB)
// router.post('/', requireAuth, addDbB)
// router.put('/:id', requireAuth, updateDbB)
// router.delete('/:id', requireAuth, removeDbB)
// router.delete('/:id', requireAuth, requireAdmin, removeDbB)

router.post('/:id/msg', requireAuth, addDbBMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeDbBMsg)

module.exports = router