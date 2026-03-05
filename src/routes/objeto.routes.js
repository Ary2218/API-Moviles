import {Router} from 'express'
import { getObjetos,postObjeto,getObjeto,putObjeto,putObjetoX, deleteObjeto,ActCantidadSum, ActCantidadRes } from '../controllers/Objeto.controller.js'
const router = Router()


router.get('/Objetos', getObjetos )
router.post('/Objeto', postObjeto)
router.get('/Objeto/:id', getObjeto )
router.delete('/Objeto/:id', deleteObjeto)
router.put('/Objeto/:id', putObjeto)
router.patch('/Objeto/:id', putObjetoX)

router.patch('/Objeto/:id/sum', ActCantidadSum)
router.patch('/Objeto/:id/res', ActCantidadRes)

export default router