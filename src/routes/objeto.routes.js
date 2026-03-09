import {Router} from 'express'
import {getObjetos,postObjeto,getObjeto,putObjeto,putObjetoX, deleteObjeto,ActCantidadSum, ActCantidadRes} from '../controllers/Objeto.controller.js'
const router = Router()

router.get('/Objetos', getObjetos )
router.get('/Objeto/:idObj', getObjeto )

router.post('/Objeto/:idMochila', postObjeto)
router.delete('/Objeto/:idObj', deleteObjeto)
router.put('/Objeto/:idObj', putObjeto)

router.patch('/Objeto/:idObj', putObjetoX)
router.patch('/Objeto/:idObj/sum', ActCantidadSum)
router.patch('/Objeto/:idObj/res', ActCantidadRes)



export default router