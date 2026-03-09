import {Router} from 'express'
import { getMochilas,postMochila,getMochila,putMochila,putMochilaX, deleteMochila } from '../controllers/Mochila.controller.js'
const router = Router()


router.get('/Mochilas', getMochilas )
router.post('/Mochila/:idViaje', postMochila)
router.get('/Mochila/:id', getMochila )
router.delete('/Mochila/:id', deleteMochila)
router.put('/Mochila/:id', putMochila)
router.patch('/Mochila/:id', putMochilaX)

export default router