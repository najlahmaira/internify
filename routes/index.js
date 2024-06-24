const dataUser = require('./user')
const login = require('./login')
const proposalMhs = require('./mahasiswa/proposal')
const balasanMhs = require('./mahasiswa/balasan')
const balasanSekre = require('./sekretaris/balasan')
const notifikasiMhs = require('./mahasiswa/notifikasi')
const profileMhs = require('./mahasiswa/profile')
const view = require('./view/views')
const server = {}

server.dataUser = dataUser
server.login = login
server.proposalMhs = proposalMhs 
server.balasanMhs = balasanMhs
server.view = view
server.balasanSekre = balasanSekre
server.notifikasiMhs = notifikasiMhs
server.profileMhs = profileMhs

module.exports = server