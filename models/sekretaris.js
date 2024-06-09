const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const pengajuan_kp = require('./pengajuan_kp')
const token_sekretaris = require('./token_sekretaris')

const sekretaris = sequelize.define('sekretaris', {
    nip:{
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    nama:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(256),
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
    tableName: 'sekretaris',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

sekretaris.hasMany(pengajuan_kp, {foreignKey: 'nip', as: 'dataSekretaris'})
pengajuan_kp.belongsTo(sekretaris, {foreignKey: 'nip', as: 'dataPengajuan'})

sekretaris.hasMany(token_sekretaris, {foreignKey: 'nip', as: 'datasTokenSekre'})
token_sekretaris.belongsTo(sekretaris, {foreignKey: 'nip', as: 'dataSekre'})


module.exports = sekretaris