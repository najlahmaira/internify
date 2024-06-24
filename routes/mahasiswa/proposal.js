const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllres = require('../../controllers/mahasiswa/proposal')

router.post('/uploadProposal', middleware.verifyTokenMahasiswa, controllres.uploadd, controllres.uploadProposal)
router.post('/editProposal/:id_proposal', middleware.verifyTokenMahasiswa, controllres.uploadd, controllres.editProposal)
router.post('/hapusProposal/:id_proposal', middleware.verifyTokenMahasiswa, controllres.hapusProposal)
router.get('/detailProposal', middleware.verifyTokenMahasiswa, controllres.detailProposal)

module.exports = router
