const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllers = require('../../controllers/mahasiswa/profile')

router.post('/gantiPassword', middleware.verifyTokenMahasiswa, controllers.gantiPassword)

module.exports = router