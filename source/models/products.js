import { DataTypes } from 'sequelize'

export default ({ sequelize }) => {

    sequelize.define('Product', {
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        product_type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        qop_soni: {
            type:DataTypes.FLOAT,
        },
        nechi_dona: {
            type:DataTypes.FLOAT,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        sell_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        optm_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        underscored: true,
        tableName: 'products',
        updatedAt:false
    })

}

