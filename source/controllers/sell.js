import { Op } from "sequelize"
import { InternalServerError } from "../utils/error.js"

const GET = async (req, res, next) => {
    try {
        const sells = await req.models.Sell.findAll()
        res.send(sells)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const SEARCH = async (req, res, next) => {
    try {
        const { search } = req.params
        const sells = await req.models.Sell.findAll({
            where: {
                who:{
                    [Op.like]: `%${search.toLowerCase()}%`
            }}
        })
        if(sells.length == 0) {
            return res.status(404).send("User not found")
        }
        res.send(sells)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const POST = async (req, res,next) => {
    try {
        const { name_unic, product_name, product_type, qop_soni, nechi_dona, pay_quantity } = req.body
        let name = product_name.toLowerCase()
        let type = product_type
        const products = await req.models.Product.findOne({where: {
                [Op.and]: [{product_name : name }, { product_type: type }],     
        }})

        if(!products){
            return res.status(404).json({
                status:404,
                message: 'no product'
            })
        }
        let sel = [products].map(el => el.sell_price)
        if(qop_soni > products.qop_soni && nechi_dona > products.nechi_dona) {
            return res.status(404).json({
                status: 404,
                message: "Omborda yetarli mahsulot yoq",
                qop_soni: products.qop_soni,
                nechi_dona: products.nechi_dona
            })
        }
        if(qop_soni > products.qop_soni) {
            return res.status(404).json({
                status: 404,
                message: "Omborda yetarli mahsulot yoq",
                qop_soni: products.qop_soni,
            })
        }
        if(nechi_dona > products.nechi_dona) {
            return res.status(404).json({
                status: 404,
                message: "Omborda yetarli mahsulot yoq",
                nechi_dona: products.nechi_dona
            })
        }
        const sell = await req.models.Sell.create({
            who: name_unic.toLowerCase(),
            product_name: product_name,
            product_type: product_type,
            qop_soni: qop_soni,
            nechi_dona: nechi_dona,
            pay_quantity: pay_quantity,
            debt: req.body.pay_quantity - ((req.body.qop_soni * sel[0]) + (req.body.nechi_dona * sel[0]))
        })
        if(sell){
            let qop_soni_y = products.qop_soni - qop_soni
            let nechi_dona_y = products.nechi_dona - nechi_dona
            
        await req.models.Product.update(
            { qop_soni:qop_soni_y, nechi_dona:nechi_dona_y},{
                where:{
                    [Op.and]: [ { product_name : name }, { product_type: type }],     
                }  
            })
        }
        return res.status(200).json({
            status:200,
            message: "The product is sold",
            data: sell
        })

    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const UPDATE = async (req, res) => {
    const { name_unic, sum } = req.body
    const sells = await req.models.Sell.findOne({
        where: {
            [Op.and]: [{who : name_unic.toLowerCase() }],     
    }})

    let summ = sells.dataValues.pay_quantity + sum
    let debt_sum = sells.dataValues.debt + sum

    const sell = await req.models.Sell.update(
        {
            pay_quantity:summ, debt:debt_sum
        },
        {
            where: {
                id: {
                    [Op.eq]: sells.dataValues.id
                },
            }
        }
    )
    return res.status(200).send(sell)
}

const DELETE = async (req, res) => {
    const deletedSell = await req.models.Sell.findOne({ 
        where: {
            id: {
                [Op.eq]: req.params.id
            },
        },
    })

    const sell = await req.models.Sell.destroy(
        {
            where: {
                id: {
                    [Op.eq]: req.params.id
                },
            },
        }
    )
    return res.status(200).send(deletedSell)
}
export default {
    GET,
    POST,
    UPDATE,
    DELETE,
    SEARCH
}