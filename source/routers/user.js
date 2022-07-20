import { Router } from 'express'
import CT from '../controllers/user.js'
import validation from '../midleware/validation.js'

const router = Router()

router.get('/users', CT.GET)
router.get('/users/client', CT.CLIENT)
router.get('/users/sell', CT.SELL)
router.get('/users/:search',CT.SEARCH)

router.post('/users/login', validation, CT.LOGIN)
router.post('/users', validation, CT.POST)
router.post('/users/register', validation, CT.REGISTER)

router.put('/users/:userId', CT.UPDATE)

router.delete('/users/:userId', CT.DELETE)

export default router 