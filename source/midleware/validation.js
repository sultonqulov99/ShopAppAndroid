import { userValidationPost, sellValidationPost, productValidationPost, ValidationLogin, ValidationRegister } from "../utils/validation.js"
import { ValidationError } from "../utils/error.js"

export default (req, res, next) => {
    try {
        if (req.method === 'POST' && req.url == '/users') {
            const { error } = userValidationPost.validate({ body: req.body })
            if(error) throw error
        }
        if (req.method === 'POST' && req.url == '/users/login') {
            const { error } = ValidationLogin.validate({ body: req.body })
            if(error) throw error
        }
        if (req.method === 'POST' && req.url == '/users/register') {
            const { error } = ValidationRegister.validate({ body: req.body })
            if(error) throw error
        }
        if(req.method === 'POST' && req.url === '/sells') {
            const { error } = sellValidationPost.validate( { body: req.body } )
            if(error) throw error
        }
        if(req.method === 'POST' && req.url === '/products') {
            const { error } = productValidationPost.validate( { body: req.body } )
            if(error) throw error
        }

        return next()
    } catch (error) {
        return next(new ValidationError(400,error.message))
    }
}