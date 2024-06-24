const response = require('express')
const jwt = require('jsonwebtoken');
const controller = {}

const loginMhs = async (req, res) => {
    res.render('login')
}
controller.loginMhs = loginMhs;

const notifikasiMhs = async (req, res) => {
    res.render('mahasiswa/notifikasi')
}
controller.notifikasiMhs = notifikasiMhs;

const unggahProposal = async (req, res) => {
    res.render('mahasiswa/unggahProposal')
}
controller.unggahProposal = unggahProposal;

const unggahBalasan = async (req, res) => {
    res.render('mahasiswa/unggahBalasan')
}
controller.unggahBalasan = unggahBalasan;

const changePass = async (req, res) => {
    res.render('mahasiswa/changePass')
}
controller.changePass = changePass;

const loginSekjur = async (req, res) => {
    res.render('loginSekre')
}
controller.loginSekjur = loginSekjur;

const suratBalasan = async (req, res) => {
    res.render('sekjur/suratBalasan')
}
controller.suratBalasan = suratBalasan;

const displayFiles = async (req, res) => {
    res.render('sekjur/displayFile')
}
controller.displayFiles = displayFiles;


module.exports = controller