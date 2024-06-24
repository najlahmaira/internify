const modelBalasan = require('../../models/surat_balasan')
const modelKelompok = require('../../models/kelompok')
const modelPengajuanKp = require('../../models/pengajuan_kp')

const {
    Op
} = require('sequelize')

//data surat balasan
const getListBalasan = async (req, res) => {
    try {
        const findPengajuan = await modelPengajuanKp.findAll({
            where: {
                id_suratBalasan: {
                    [Op.ne]: null
                }
            },
            include: [{
                    model: modelKelompok,
                    as: 'dataKelompokPengajuan',
                    attributes: ['id_kelompok']
                },
                {
                    model: modelBalasan,
                    as: 'dataPengajuanBalasan',
                    attributes: ['tanggal_pengajuan', 'perusahaan_tujuan', 'status', 'file_surat_balasan', 'id_suratBalasan']
                }
            ],
            attributes: ['id_pengajuan']
        })

        if (findPengajuan.length <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Data surat balasan belum tersedia'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data surat tersedia',
            data: findPengajuan
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Kesalahan Server'
        })
    }
}

const getSuratBalasanFile = async (req, res) => {
    try {
        const {
            id
        } = req.query;

        const suratBalasan = await modelPengajuanKp.findOne({
            where: {
                id_suratBalasan: id
            },
            include: [{
                model: modelBalasan,
                as: 'dataPengajuanBalasan',
                attributes: ['file_surat_balasan']
            }]
        });
        if (!suratBalasan) {
            return res.status(404).json({
                success: false,
                message: 'Surat balasan tidak ditemukan'
            });
        }

        const filePath = `/doc/balasan/${suratBalasan.dataPengajuanBalasan.file_surat_balasan}`;
        return res.status(200).json({
            success: true,
            filePath
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Kesalahan saat memuat file surat balasan'
        });
    }
};

module.exports = {
    getListBalasan,
    getSuratBalasanFile
}