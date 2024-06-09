const dataUser = require('./user')
const login = require('./login')
const proposalMhs = require('./mahasiswa/proposal')
const server = {}

server.dataUser = dataUser
server.login = login
server.proposalMhs = proposalMhs 

module.exports = server