const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getDbAs, getDbAById, addDbA, updateDbA, removeDbA } = require('./dbA.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getDbAs)
router.get('/:id', getDbAById)
router.post('/', addDbA)
router.put('/:id', updateDbA)
router.delete('/:id', removeDbA)

module.exports = router