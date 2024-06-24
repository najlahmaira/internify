const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const pengajuan_kp = require('./pengajuan_kp')

const surat_tugas = sequelize.define('surat_tugas', {
    id_surat_tugas: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    tanggal_pengajuan:{
        type: DataTypes.DATE,
        allowNull: false
    },
    judul_proposal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    perusahaan_tujuan:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lokasi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_surat_tugas:{
        type: DataTypes.STRING(256),
        allowNull: true
    },
    status:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'surat_tugas',
    timestamps: true,
    createdAt:'created_at',
    updatedAt: 'updated_at'
})

surat_tugas.hasOne(pengajuan_kp, {foreignKey: 'id_suratTugas', as: 'dataSuratTugas'})
pengajuan_kp.belongsTo(surat_tugas, {foreignKey: 'id_suratTugas', as: 'dataPengajuanTugas'})

module.exports = surat_tugas