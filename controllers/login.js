const modelMhs = require('../models/mahasiswa')
const modelTokenMhs = require('../models/token_mahasiswa')
const modelSekre = require('../models/sekretaris')
const modelTokenSekre = require('../models/token_sekretaris')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//login mahasiswa
const loginMahasiswa = async (req,res) => {
    try {
        const {nim,password} = req.body
        if (!nim || !password) {
            return res.status(400).json({success:false, message: 'Silahkan lengkapi data akun anda'})
        }
        const findAkun = await modelMhs.findOne({
            where:{
                nim_ketua: nim
            }
        })
        if (!findAkun) {
            return res.status(400).json({success:false, message: 'Akun anda tidak ditemukan'})
        }
        bcrypt.compare(password, findAkun.password, async (err, results) => {
            if (err || !results) {
                return res.status(400).json({success:false, message: 'Password akun anda salah'})
            }
            const token = jwt.sign(
                {
                    nim
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1w'
                }
            )
            await modelTokenMhs.create({
                token: token,
                nim_ketua: nim
            })
            res.status(200).json({success:true, message: 'Login Berhasil', token: token})
        })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

//login sekretaris
const loginSekretaris = async (req,res) => {
    try {
        const {nip,password} = req.body
        if (!nip || !password) {
            return res.status(400).json({success:false, message: 'Silahkan lengkapi data akun anda'})
        }
        const findAkun = await modelSekre.findOne({
            where:{
                nip: nip
            }
        })
        if (!findAkun) {
            return res.status(400).json({success:false, message: 'Akun anda tidak ditemukan'})
        }
        bcrypt.compare(password, findAkun.password, async (err, results) => {
            if (err || !results) {
                return res.status(400).json({success:false, message: 'Password akun anda salah'})
            }
            const token = jwt.sign(
                {
                    nip
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1w'
                }
            )
            await modelTokenSekre.create({
                token: token,
                nip: nip
            })
            res.status(200).json({success:true, message: 'Login Berhasil', token: token})
        })  
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

module.exports = {loginMahasiswa, loginSekretaris}