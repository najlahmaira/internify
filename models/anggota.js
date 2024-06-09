const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const anggota = sequelize.define('anggota', {
    id_anggota:{
        primaryKey: true, 
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
    },
    id_kelompok:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    nim_anggota:{
        type: DataTypes.STRING(20),
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
    tableName: 'anggota',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = anggota