const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllers = require('../../controllers/mahasiswa/notifikasi')

router.get('/notifikasiMhs', middleware.verifyTokenMahasiswa, controllers.dataNotifikasi)

module.exports = router