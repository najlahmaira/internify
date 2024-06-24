const modelProposal = require('../../models/proposal')
const modelPengajuanKp = require('../../models/pengajuan_kp')
const modelKelompok = require('../../models/kelompok')
const modelSekretaris = require('../../models/sekretaris')
const multer = require('multer')
const path = require('path')

//upload proposal
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'doc', 'proposal'))
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

const uploadProposal = async (req,res) => {
    try {
        const{tanggal_pengajuan, judul_proposal, perusahaan_tujuan, lokasi} = req.body
        const file_proposal = req.file
        const nim_ketua = req.mahasiswa.nim
        if (!tanggal_pengajuan || !judul_proposal || !perusahaan_tujuan || !lokasi) {
            return res.status(400).json({success: false, message: 'Lengkapi data proposal anda'})
        }
        if (!file_proposal) {
            return res.status(400).json({success: false, message: 'Silahkan inputkan file anda'})
        }
        const findFile = await modelProposal.findOne({where:{
            file_proposal: file_proposal.originalname
        }})
        if (findFile) {
            return res.status(400).json({success: false, message: 'File proposal anda sudah pernah ditambahkan'})
        }

        const findKelompok = await modelKelompok.findOne({where: {nim_ketua: nim_ketua}})
        if (!findKelompok) {
            return res.status(400).json({success: false, message: 'Kelompok tidak ditemukan'})
        }

        const findSekre = await modelSekretaris.findOne()
        if (!findSekre) {
            return res.status(400).json({success: false, message: 'Data sekretaris tidak ditemukan'})
        }

        const tambahProposal = await modelProposal.create({
            tanggal_pengajuan: tanggal_pengajuan,
            judul_proposal: judul_proposal,
            perusahaan_tujuan: perusahaan_tujuan,
            lokasi: lokasi,
            file_proposal: file_proposal.originalname,
            status_proposal: 'Disetujui'
        })

        await modelPengajuanKp.create({
            nip: findSekre.nip,
            id_kelompok: findKelompok.id_kelompok,
            id_proposal: tambahProposal.id_proposal,
            status_pengajuan: 'Diproses'
        })

        return res.status(200).json({success: true, message: 'Proposal berhasil ditambahkan'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

//edit proposal
const editProposal = async (req,res) => {
    try {
        const {id_proposal} = req.params
        const findProposal = await modelProposal.findByPk(id_proposal)
        if (!findProposal) {
            return res.status(400).json({success: false, message: 'Proposal tidak ditemukan'})
        }
        const {tanggal_pengajuan, judul_proposal, perusahaan_tujuan, lokasi} = req.body
        const file_proposal = req.file
        if (!file_proposal) {
            await modelProposal.update({
                tanggal_pengajuan: tanggal_pengajuan || findProposal.tanggal_pengajuan,
                judul_proposal: judul_proposal || findProposal.judul_proposal,
                perusahaan_tujuan: perusahaan_tujuan || findProposal.perusahaan_tujuan,
                lokasi: lokasi || findProposal.lokasi
            }, {
                where:{
                    id_proposal: id_proposal
                }
            })
            return res.status(200).json({success: true, message: 'Proposal anda berhasil diperbaharui'})
        }
        await modelProposal.update({
            tanggal_pengajuan: tanggal_pengajuan || findProposal.tanggal_pengajuan,
            judul_proposal: judul_proposal || findProposal.judul_proposal,
            perusahaan_tujuan: perusahaan_tujuan || findProposal.perusahaan_tujuan,
            lokasi: lokasi || findProposal.lokasi,
            file_proposal: file_proposal.originalname
        }, {
            where:{
                id_proposal: id_proposal
            }
        })
        return res.status(200).json({success: true, message: 'Proposal anda berhasil diperbaharui'})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

//hapus proposal
const hapusProposal = async (req,res) => {
    try {
        const {id_proposal} = req.params
        const findProposal = await modelProposal.findByPk(id_proposal)
        if (!findProposal) {
            return res.status(400).json({success: false, message: 'Proposal tidak ditemukan'})
        }
        await modelProposal.destroy({
            where:{id_proposal: id_proposal}
        })
        return res.status(200).json({success: true, message: 'Proposal anda berhasil dihapus'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

//detail proposal
const detailProposal = async (req,res) => {
    try {
        const nim_ketua = req.mahasiswa.nim

        const findKelompok = await modelKelompok.findOne({where:{nim_ketua: nim_ketua}})
        if (!findKelompok) {
            return res.status(400).json({success: false, message: 'Kelompok mahasiswa tidak ditemukan'})
        }
        const findPengajuan = await modelPengajuanKp.findOne({
            where:{
                id_kelompok:findKelompok.id_kelompok
            },
            include: [
                {
                    model: modelProposal,
                    as: 'dataProposalPengajuan',
                    attributes: ['id_proposal', 'tanggal_pengajuan', 'judul_proposal', 'perusahaan_tujuan', 'lokasi', 'file_proposal']
                }
            ],
            attributes: ['id_pengajuan']
        })
        if (!findPengajuan) {
            return res.status(400).json({success: false, message: 'Belum melakukan pengajuan Kp dan Proposal'})
        }

        return res.status(200).json({success:true, message: 'Sudah melakukan pengajuan Kp dan proposal', data: findPengajuan})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan Server'})
    }
}

module.exports = {uploadProposal, uploadd, editProposal, hapusProposal, detailProposal}