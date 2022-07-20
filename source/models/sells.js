import { DataTypes } from 'sequelize'

export default async ({ sequelize }) => {

    await sequelize.define('Sell', {
        who: {
            type: DataTypes.STRING,
            allowNull:true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        qop_soni:{
            type: DataTypes.FLOAT,
        },
        nechi_dona: {
            type: DataTypes.FLOAT,
        },
        pay_quantity:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        debt: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        underscored: true,
        tableName: 'sells',
        createAt:"time_taken",
        updatedAt:false
    })

}

