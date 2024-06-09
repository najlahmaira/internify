const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const pengajuan_kp = sequelize.define('pengajuan_kp', {
    id_pengajuan:{
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    nip:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_kelompok:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    id_suratPengantar:{
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    id_suratBalasan:{
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    id_proposal:{
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    id_suratTugas:{
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    status_pengajuan:{
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
    tableName: 'pengajuan_kp',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = pengajuan_kp