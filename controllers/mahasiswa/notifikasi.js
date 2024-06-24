const modelPengajuan = require('../../models/pengajuan_kp')
const modelPengantar = require('../../models/surat_pengantar')
const modelSuratTugas = require('../../models/surat_tugas')
const {Op} = require('sequelize')
const modelKelompok = require('../../models/kelompok')

//data notifikasi
const dataNotifikasi = async (req,res) => {
    try {
       const nim_ketua = req.mahasiswa.nim 
       const findKelompok = await modelKelompok.findOne({where:{nim_ketua: nim_ketua}})

       if (!findKelompok) {
        return res.status(400).json({success: false, message: 'Kelompok mahasiswa tidak ditemukan'})
       }

       const findPengajuan = await modelPengajuan.findAll({
            where: {
                id_kelompok: findKelompok.dataValues.id_kelompok
            },
            include: [
                {
                    model: modelPengantar,
                    as: 'dataPengajuanPengantar',
                    where: {
                        status: {
                            [Op.or]: ['disetujui', 'ditolak']
                        }
                    },
                    attributes: ['file_suratPengantar', 'updated_at', 'status'],
                    required: false
                },
                {
                    model: modelSuratTugas,
                    as: 'dataPengajuanTugas',
                    where: {
                        status: {
                            [Op.or]: ['disetujui', 'ditolak']
                        }
                    },
                    attributes: ['file_surat_tugas', 'updated_at', 'status'],
                    required: false
                }
            ],
            attributes: ['id_pengajuan']
        });
    

       if (!findPengajuan) {
        return res.status(400).json({success: false, message: 'Belum ada pemberitahuan untuk anda'})
       }
       return res.status(200).json({success: true, message: 'Terdapat pemberitahuan', data: findPengajuan})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

module.exports = {dataNotifikasi}