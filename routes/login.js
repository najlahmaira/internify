const express = require('express')
const router = express.Router()
const controllers = require('../controllers/login')

router.post('/loginMhs', controllers.loginMahasiswa)
router.post('/loginSekre', controllers.loginSekretaris)

module.exports = router