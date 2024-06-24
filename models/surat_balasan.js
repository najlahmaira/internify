const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const pengajuan_kp = require('./pengajuan_kp')

const surat_balasan = sequelize.define('surat_balasan', {
    id_suratBalasan:{
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    tanggal_pengajuan:{
        type: DataTypes.DATE,
        allowNull: false
    },
    perusahaan_tujuan:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    file_surat_balasan:{
        type: DataTypes.STRING(256),
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'surat_balasan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

surat_balasan.hasOne(pengajuan_kp, {foreignKey: 'id_suratBalasan', as: 'dataSuratBalasan'})
pengajuan_kp.belongsTo(surat_balasan, {foreignKey: 'id_suratBalasan', as: 'dataPengajuanBalasan'})


module.exports = surat_balasan