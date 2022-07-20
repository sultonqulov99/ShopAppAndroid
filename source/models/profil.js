import { DataTypes } from 'sequelize'

export default ({ sequelize }) => {

    sequelize.define('Profil', {
        profil_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        underscored: true,
        tableName: 'profil',
        updatedAt:false
    })

}