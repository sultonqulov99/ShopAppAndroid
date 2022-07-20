import { Op } from "sequelize"
import { InternalServerError} from "../utils/error.js"

const GET = async (req, res, next) => {
    try {
        const users = await req.models.User.findAll()
        res.status(200).json({
            status:200,
            message: "All users",
            data: users
        })
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const CLIENT = async (req, res, next) => {
    try {
        const users = await req.models.User.findAll()
        let debt_u = 0
        let user = users.map(async u => {
            let k = u.username
            let sell = await req.models.Sell.findAll({
                where:{
                    who:k
                }
            })
            for (const key of sell) {
                debt_u += key.debt
            }
            u.dataValues.debt_u = debt_u
            debt_u = 0
            
            return u
        })
        const arr = []
        for (const key of user) {
            arr.push(await key);
            
        }
        return res.json(arr)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const SELL = async (req, res, next) => {
    try {
        const users = await req.models.User.findAll()
        let pay_quantity_u = 0
        let debt_u = 0
        let user = users.map(async u => {
            let k = u.username
            let sell = await req.models.Sell.findAll({
                where:{
                    who:k
                }
            })
            for (const key of sell) {
                pay_quantity_u += key.pay_quantity
                debt_u += key.debt
            }
            u.dataValues.pay_quantity_u = pay_quantity_u 
            u.dataValues.debt_u = debt_u
            pay_quantity_u = 0
            debt_u = 0
            u.dataValues.data = sell
            return u
        })
        const arr = []
        for (const key of user) {
            arr.push(await key);
            
        }
        return res.json(arr)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const SEARCH = async (req, res, next) => {
    try {
        const { search } = req.params
        const users = await req.models.User.findAll({
            where: {
                who:{
                    [Op.like]: `%${search.toLowerCase()}%`
            }}
        })
        if(users.length == 0) {
            return res.status(404).send("User not found")
        }
        res.send(users)
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const LOGIN = async (req,res,next) => {
    try {
        const { email, password } = req.body
        const profil = await req.models.Profil.findAll({
            where: {
                [Op.and]: [{email : email }, { password: password }],     
            }
        })
        if(profil.length == 0) {
            return res.status(404).json({
                status:404,
                message: "There is no such user"
            })
        }
        return res.status(200).json({
            status:200,
            message:"OK",
            data:profil
        })
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}
const REGISTER = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const pro = await req.models.Profil.findAll({
            where: {
                [Op.and]:[{ email: email },{ password: password }]
            }
        })
        if(pro.length !== 0) {
            return res.status(404).json({
                status: 404,
                message: "Already exists"
            })
        }
        const profil = await req.models.Profil.create({
            email: email,
            password: password
        })
        return res.status(200).json({
            status: 200,
            message: "successfully register",
            data: profil
        })
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const POST = async (req, res, next) => {
    try {
        let { username, address, contact } = req.body
        username = username.toLowerCase()
        const users = await req.models.User.findAll(({
            where: {
                username:username
            }
        }))
        if(users.length !== 0){
            return res.send("User already exists")
        }
        const user = await req.models.User.create({
            username: username,
            address: address,
            contact: contact
        })
    
        return res.status(200).json({
            status: 200,
            message: "User added successfully"
        })
    } catch (error) {
        return next(new InternalServerError(500,error.message))
    }
}

const UPDATE = async (req, res) => {
    const user = await req.models.User.update(
        req.body,
        {
            where: {
                user_id: {
                    [Op.eq]: req.params.userId
                },
            }
        }
    )

    return res.status(200).send(user)
}

const DELETE = async (req, res) => {
    const deletedUser = await req.models.User.findOne({ 
        where: {
            user_id: {
                [Op.eq]: req.params.userId
            },
        },
    })

    const user = await req.models.User.destroy(
        {
            where: {
                user_id: {
                    [Op.eq]: req.params.userId
                },
            },
        }
    )
    return res.status(200).send(deletedUser)
}

export default {
    DELETE,
    UPDATE,
    POST,
    GET,
    SEARCH,
    CLIENT,
    SELL,
    LOGIN,
    REGISTER
}