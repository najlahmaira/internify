const bcrypt = require('bcrypt')
const modelMahasiswa = require('../../models/mahasiswa')

//ganti password
const gantiPassword = async (req,res) => {
    try {
        const nim_ketua = req.mahasiswa.nim
        const {password_baru, konfirmasi_password} = req.body
        if (!password_baru || !konfirmasi_password) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi inputan anda'})
        }

        if (password_baru != konfirmasi_password) {
            return res.status(400).json({success: false, message: 'Password baru anda dengan konfirmasi password tidak sama'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password_baru, salt)

        await modelMahasiswa.update({
            password: hashedPass
        }, {
            where:{
                nim_ketua: nim_ketua
            }
        })
        return res.status(200).json({success: true, message: 'Password anda berhasil di ubah'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

module.exports = {gantiPassword}