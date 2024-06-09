const express = require('express')
const router = express.Router()
const controllers = require('../controllers/user')

router.post('/tambahSekretaris', controllers.tambahAkunSekre)
router.post('/tambahMhs', controllers.tambahAkunMhs)

module.exports = router