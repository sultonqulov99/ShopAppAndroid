import { DataTypes } from 'sequelize'

export default ({ sequelize }) => {

    sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isAlpha: true
            }
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/i
            }
        }
    }, {
        underscored: true,
        tableName: 'users',
        updatedAt:false
    })

}