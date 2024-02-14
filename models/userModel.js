const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');

// define our models
const User = sequelize.define('User', {
    user_id: {
        // autogenerate user_id
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true

    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

module.exports = {
    User
}