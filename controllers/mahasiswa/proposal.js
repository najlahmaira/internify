const modelProposal = require('../../models/proposal')
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
        await modelProposal.create({
            tanggal_pengajuan: tanggal_pengajuan,
            judul_proposal: judul_proposal,
            perusahaan_tujuan: perusahaan_tujuan,
            lokasi: lokasi,
            file_proposal: file_proposal.originalname,
            status_proposal: 'menunggu'
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

module.exports = {uploadProposal, uploadd, editProposal, hapusProposal}