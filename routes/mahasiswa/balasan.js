const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllers = require('../../controllers/mahasiswa/balasan')

router.post('/uploadBalasan', middleware.verifyTokenMahasiswa, controllers.uploadd, controllers.uploadBalasan)

router.get('/detailBalasan', middleware.verifyTokenMahasiswa, controllers.detailBalasan)

module.exports = router