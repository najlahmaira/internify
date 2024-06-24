const express = require('express')
const router = express.Router()
const controller = require('../../controllers/view/views')
const middleware = require('../../middleware/authentication')

router.get('/viewLoginMhs', controller.loginMhs)
router.get('/notifikasiMhsView', controller.notifikasiMhs)
router.get('/unggahProposalView', controller.unggahProposal)
router.get('/unggahBalasanView', controller.unggahBalasan)
router.get('/changePassView', controller.changePass)

router.get('/viewLoginSekjur', controller.loginSekjur)
router.get('/fileView', controller.displayFiles)
router.get('/suratBalasanView', controller.suratBalasan)

module.exports = router