import { Router } from 'express'
import CT from '../controllers/product.js'
import validation from '../midleware/validation.js'
const router = Router()

router.get('/products', CT.GET)
router.get('/categories',CT.CATEGORIES)
router.get('/products/:search',CT.SEARCH)
router.get('/product/:praductName',CT.PRODUCTNAME)

router.post('/products', validation, CT.POST)

router.put('/products/:product_id', CT.UPDATE)

router.delete('/products/:product_id', CT.DELETE)

export default router