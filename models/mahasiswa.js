const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const kelompok = require('./kelompok')
const token_mahasiswa = require('./token_mahasiswa')

const mahasiswa = sequelize.define('mahasiswa', {
    nim_ketua:{
        primaryKey: true, 
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nama:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password:{
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
    tableName: 'mahasiswa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

mahasiswa.hasMany(token_mahasiswa, {foreignKey: 'nim_ketua', as: 'dataToken'})
token_mahasiswa.belongsTo(mahasiswa, {foreignKey: 'nim_ketua', as: 'dataMahasiswa'})

mahasiswa.hasOne(kelompok, {foreignKey: 'nim_ketua', as: 'datKelompok'})
kelompok.belongsTo(mahasiswa, {foreignKey: 'nim_ketua', as: 'dataMahasiswaKlmpk'})

module.exports = mahasiswa