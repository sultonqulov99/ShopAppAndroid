import { Router } from 'express'
import CT from '../controllers/sell.js'
import validation from '../midleware/validation.js'
const router = Router()

router.get('/sells', CT.GET)
router.get('/sells/:search', CT.SEARCH)

router.post('/sells', validation, CT.POST)

router.put('/sells/sum', CT.UPDATE)

router.delete('/sells/:id', CT.DELETE)

export default router