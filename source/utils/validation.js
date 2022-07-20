import Joi from 'joi'
export const userValidationPost = Joi.object({
    body: Joi.object({
        username: Joi.string().required().max(30).alphanum(),
        address: Joi.string().required(),
        contact: Joi.string().regex(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/).required()
    }),
})
export const ValidationLogin = Joi.object({
    body: Joi.object({
        email: Joi.string().email().trim(true).required(),
        password: Joi.string().min(4).trim(true).required(),
    }),
})
export const ValidationRegister = Joi.object({
    body: Joi.object({
        email: Joi.string().email().trim(true).required(),
        password: Joi.string().min(4).trim(true).required(),
    }),
})
export const sellValidationPost = Joi.object({
    body: Joi.object({
        name_unic: Joi.string().required(),
        product_name: Joi.string().required(),
        product_type: Joi.string().required(),
        qop_soni: Joi.number().required(),
        nechi_dona: Joi.number().required(),
        pay_quantity: Joi.number().required()
    }),
})
export const productValidationPost = Joi.object({
    body: Joi.object({
        product_name: Joi.string().required(),
        product_type: Joi.string().required(),
        qop_soni: Joi.number().required(),
        nechi_dona: Joi.number().required(),
        price: Joi.number().required(),
        sell_price: Joi.number().required(),
        optm_price: Joi.number().required()
    }),
})