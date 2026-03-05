// "npm run dev" para correr en modo desarrollo
import express from "express"
import viajeRoutes from './routes/viaje.routes.js'
import mochilaRoutes from './routes/mochila.routes.js'
import objetoRoutes from './routes/objeto.routes.js'
import { Router } from "express"

const router = Router()
const app = express()

app.use(express.json())

app.use (viajeRoutes)
app.use (mochilaRoutes)
app.use (objetoRoutes)


app.listen(3000);
console.log("Servidor corriendo en el puerto 3000");