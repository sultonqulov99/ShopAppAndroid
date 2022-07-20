
export default async ({ sequelize }) => {
    await sequelize.models.User.bulkCreate([
        {
            username: 'Sardor',
            address: "Oybek kocha",
            contact: "998975661099",
        },
        {
            username: 'Sadr',
            address: "Oybe kocha",
            contact: "998975661099",
        },
    ])

    await sequelize.models.Product.bulkCreate([
        {
            product_name: 'Salafan',
            from: "Oybek",
            where: "Sirdaryo",
            price:12000,
            quantity:100.5
        },
        {
            product_name: 'Paket',
            from: "Tohir",
            where: "Namangan",
            price:22000,
            quantity:200
        },
    ])

    await sequelize.models.Sell.bulkCreate([
        {
            who:"Sardor",
            product_name: "sement",
            quantity: 10,
            total:10000,
            pay_quantity: 4000,
            remained_quantity: 6000,
        },
        {
            who: "sadr",
            product_name: "paket",
            quantity: 20,
            total:20000,
            pay_quantity: 12000,
            remained_quantity: 8000,
        },
    ])
}

