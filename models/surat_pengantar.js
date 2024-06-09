const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const pengajuan_kp = require('./pengajuan_kp')

const surat_pengantar = sequelize.define('surat_pengantar', {
    id_suratPengantar:{
        type: DataTypes.CHAR(36),
        allowNull: false, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    perusahaan_tujuan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_mulai: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tanggal_selesai: {
        type: DataTypes.DATE,
        allowNull: false
    },
    file_suratPengantar: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    cretaed_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'surat_pengantar',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

surat_pengantar.hasOne(pengajuan_kp, {foreignKey: 'id_suratPengantar', as: 'dataSuratPengantar'})
pengajuan_kp.belongsTo(surat_pengantar, {foreignKey: 'id_suratPengantar', as: 'dataPengajuan'})

module.exports = surat_pengantar