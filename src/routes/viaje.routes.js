import {Router} from 'express'
import { getViajes,postViaje,getViaje,putViaje,putViajeX, deleteViaje} from '../controllers/viaje.controller.js'
const router = Router()


router.get('/Viajes', getViajes )
router.post('/Viaje', postViaje)
router.get('/Viaje/:id', getViaje )
router.delete('/Viaje/:id', deleteViaje)
router.put('/Viaje/:id', putViaje)
router.patch('/Viaje/:id', putViajeX)

export default router