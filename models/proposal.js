const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const pengajuan_kp = require('./pengajuan_kp')

const proposal = sequelize.define('proposal', {
    id_proposal: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4
    },
    tanggal_pengajuan: {
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
    lokasi:{
        type: DataTypes.STRING,
        allowNull: false
    },
    file_proposal:{
        type: DataTypes.STRING(256),
        allowNull: false
    },
    status_proposal:{
        type:DataTypes.STRING(30),
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
    tableName: 'proposal',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

proposal.hasOne(pengajuan_kp, {foreignKey: 'id_proposal', as: 'dataPengajuanProposal'})
pengajuan_kp.belongsTo(proposal, {foreignKey: 'id_proposal', as: 'dataProposalPengajuan'})


module.exports = proposal