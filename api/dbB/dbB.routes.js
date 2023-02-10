const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getDbBs, addDbB, updateDbB } = require('./dbB.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getDbBs)

router.post('/', addDbB)
router.put('/:id', updateDbB)


module.exports = router