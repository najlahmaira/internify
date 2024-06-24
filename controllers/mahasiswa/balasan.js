const multer = require('multer')
const modelPengajuanKp = require('../../models/pengajuan_kp')
const modelKelompok = require('../../models/kelompok')
const modelBalasan = require('../../models/surat_balasan')
const modelPengantar = require('../../models/surat_pengantar')
const path = require('path')
const {Op} = require('sequelize')

//upload surat balasan
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'doc', 'balasan'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const fileFilter = function (req, file, cb) {
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new multer.MulterError('Jenis File Tidak Di izinkan, Hanya PDF yg Di izinkan');
        error.message = 'Jenis File Tidak Di izinkan, Hanya PDF yg Di izinkan'
        return cb(error, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const uploadd = upload.single('file')

const uploadBalasan = async (req,res) => {
    try {
        const {tanggal_pengajuan, perusahaan_tujuan, status} = req.body
        const file_surat_balasan = req.file

        if (!tanggal_pengajuan || !perusahaan_tujuan || !status) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi data surat balasan anda'})
        }

        if (!file_surat_balasan) {
            return res.status(400).json({success: false, message: 'Silahkan upload surat balasan anda terlebih dahulu'})
        }

        const nim_ketua = req.mahasiswa.nim
        console.log(nim_ketua)
        const findKelompok = await modelKelompok.findOne({where:{nim_ketua: nim_ketua}})
        
        if (!findKelompok) {
            return res.status(400).json({success: false, message: 'Kelompok mahasiswa tidak ditemukan'})
        }

        const findPenngantar = await modelPengajuanKp.findOne({
            where: {
                id_Kelompok: findKelompok.dataValues.id_kelompok,
                id_suratPengantar: {
                    [Op.ne]: null
                }
            },
            include:[
                {
                    model: modelPengantar,
                    as: 'dataPengajuanPengantar',
                    where:{
                        status: 'disetujui'
                    }
                }
            ]
        })

        if (!findPenngantar) {
            return res.status(400).json({success: false, message: 'Surat pengantar belum ditambahkan atau ditolak'})
        }

        const findBalasan = await modelBalasan.findOne({where:{file_surat_balasan: file_surat_balasan.originalname}})

        if (findBalasan) {
            return res.status(400).json({success: false, message: 'File sudah pernah ditambahkan'})
        }

        const tambahBalasan = await modelBalasan.create({
            tanggal_pengajuan: tanggal_pengajuan,
            perusahaan_tujuan: perusahaan_tujuan,
            status: status,
            file_surat_balasan: file_surat_balasan.originalname
        })
        await modelPengajuanKp.update({
            id_suratBalasan: tambahBalasan.id_suratBalasan
        }, {
            where:{
                id_pengajuan: findPenngantar.dataValues.id_pengajuan
            }
        })
        return res.status(200).json({success: true, message: 'Surat balasan berhasil ditambahkan'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

//detail balasan
const detailBalasan = async (req,res) => {
    try {
        const nim_ketua = req.mahasiswa.nim
        const findKelompok = await modelKelompok.findOne({where:{nim_ketua: nim_ketua}})

        if (!findKelompok) {
            return res.status(400).json({success: false, message: 'Data kelompok mahasiswa tidak ditemukan'})
        }

        const findPengajuan = await modelPengajuanKp.findOne({
            where:{
                id_kelompok: findKelompok.dataValues.id_kelompok,
                id_suratBalasan:{
                    [Op.ne]: null
                }
            },
            include:[
                {
                    model: modelBalasan,
                    as: 'dataPengajuanBalasan',
                    attributes: ['id_suratBalasan', 'tanggal_pengajuan', 'perusahaan_tujuan', 'status', 'file_surat_balasan']
                }
            ],
            attributes: ['id_pengajuan']
        })

        if (!findPengajuan) {
            return res.status(400).json({success: false, message: 'Belum menambahkan surat balasan'})
        }

        return res.status(200).json({success: true, message: 'Sudah menambahkan surat balasan', data: findPengajuan})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

module.exports ={uploadd, uploadBalasan, detailBalasan}