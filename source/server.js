import express from 'express'
import './config.js'
import UserRouter from './routers/user.js'
import SellRouter from './routers/sell.js'
import ProductRouter from './routers/product.js'
import database from './db/index.js'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
// import mockData from './db/mock.js'

const PORT = process.env.PORT || 5000

!async function () {
    const app = express()
    app.use(cors())
    
    const db = await database()
    // await mockData({ sequelize: db })
    app.use(express.json())
    app.use((req, res, next) => {
        req.models = db.models
        next()
    })

    app.use(UserRouter)
    app.use(ProductRouter)
    app.use(SellRouter)  
    app.use((error, req, res, next) => {
        if(error.status != 500){
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
            })
        }
        fs.appendFileSync(
            path.join(process.cwd(),'source','logger.txt'),
            `${req.method}___${req.url}___${Date.now()}___${error.name}___${error.message}\n`
        )
        res.status(error.status).json({
            status: error.status,
            message: "Interval server error",
        })
    }) 
    
    app.listen(PORT, () => console.log('server ready at *' + PORT))
}()