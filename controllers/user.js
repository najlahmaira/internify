const modelSekre = require('../models/sekretaris')
const bcrypt = require('bcrypt')
const modelMhs = require('../models/mahasiswa')

//tambah akun sekre
const tambahAkunSekre = async (req,res) => {
    try {
        const {nip, nama, password} = req.body
        if (!nip || !nama || !password) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi data akun anda'})
        }

        const findSekre = await modelSekre.findOne({where:{nip: nip}})
        if (findSekre) {
            return res.status(400).json({success: false, message: 'Data sekretaris sudah tersedia'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password, salt)
        await modelSekre.create({
            nip:nip,
            nama: nama,
            password: hashedPass
        })
        return res.status(200).json({success: true, message: 'Data sekretaris berhasil ditambahkan'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

//tambah akun mahasiswa
const tambahAkunMhs = async (req,res) => {
    try {
        const {nim_ketua, nama, password} = req.body
        if (!nim_ketua || !nama || !password) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi data akun anda'})
        }
        const findMhs = await modelMhs.findOne({where: {nim_ketua: nim_ketua}})
        if (findMhs) {
            return res.status(400).json({success: false, message: 'Akun mahasiswa sudah tersedia'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password, salt)
        await modelMhs.create({
            nim_ketua: nim_ketua,
            nama: nama,
            password: hashedPass
        })
        return res.status(200).json({success: true, message: 'Data mahasiswa berhasil ditambahkan'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

module.exports = {tambahAkunMhs, tambahAkunSekre}