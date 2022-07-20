import { Op } from "sequelize"
import { InternalServerError } from "../utils/error.js"

const GET = async (req, res, next) => {
    try {
        const products = await req.models.Product.findAll()
        res.status(200).send(products)

    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const SEARCH = async (req, res, next) => {
    try {
        const { search } = req.params
        const products = await req.models.Product.findAll({
            where: {
                product_name:{
                    [Op.like]: `%${search.toLowerCase()}%`
            }}
        })
        if(products.length == 0) {
            return res.status(404).send("User not found")
        }
        res.send(products)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const CATEGORIES = async (req, res, next) => {
    try {
        const products = await req.models.Product.findAll()
        let arr = []
        for (const el of products) {
            arr.push(el.product_name)
        }
        let arr1 = []
        for (let i = 0; i < arr.length; i++) {
            arr1.push(arr[i].toLowerCase())
        }
        arr = [...new Set(arr1)]
        return res.json(arr)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const PRODUCTNAME = async (req, res, next) => {
    try {
        const { praductName } = req.params
        const products = await req.models.Product.findAll({
            where: {
                product_name: praductName
            }
        })
        return res.status(200).json({
            status: 200,
            message: "OK",
            data: products
        })
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const POST = async (req, res, next) => {
    try {
        const { product_name, product_type, qop_soni, nechi_dona, price, sell_price, optm_price } = req.body
        
        let name = product_name.toLowerCase()
        let type = product_type
        const products = await req.models.Product.findOne({where: {
                [Op.and]: [{product_name : name }, { product_type: type }],     
        }})
    
        if(!products){
            const product = await req.models.Product.create({
                product_name: product_name.toLowerCase(),
                product_type: product_type,
                qop_soni: qop_soni,
                nechi_dona: nechi_dona,
                price: price,
                sell_price: sell_price, 
                optm_price: optm_price
            })
            return res.status(200).json({
                status: 200,
                message:"Product added successfully",
                data: product
            })
        }
        let qop_soni_y = products.qop_soni + qop_soni
        let nechi_dona_y = products.nechi_dona + nechi_dona

        const product_put = await req.models.Product.update(
            { qop_soni:qop_soni_y, nechi_dona:nechi_dona_y, price, sell_price, optm_price },{
            where:{
                [Op.and]: [ { product_name : name }, { product_type: type }],     
            }  
        })
        return res.status(200).json({
            status:200,
            message: "new product added",
            data: product_put
        })
    
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
    
}

const UPDATE = async (req, res) => {
    const product = await req.models.Product.update(
        req.body,
        {
            where: {
                product_id: {
                    [Op.eq]: req.params.product_id
                },
            }
        }
    )

    return res.status(200).send(product)
}

const DELETE = async (req, res) => {
    const deletedUser = await req.models.Product.findOne({ 
        where: {
            user_id: {
                [Op.eq]: req.params.product_id
            },
        },
    })

    const product = await req.models.Product.destroy(
        {
            where: {
                user_id: {
                    [Op.eq]: req.params.product_id
                },
            },
        }
    )
    return res.status(200).send(deletedUser)

}

export default {
    GET,
    POST,
    UPDATE,
    DELETE,
    SEARCH,
    CATEGORIES,
    PRODUCTNAME
}