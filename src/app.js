import express from "express"
import viajeRoutes from './routes/viaje.routes.js'
import mochilaRoutes from './routes/mochila.routes.js'
import objetoRoutes from './routes/objeto.routes.js'


const app = express()

app.use(express.json())

app.use (viajeRoutes)
app.use (mochilaRoutes)
app.use (objetoRoutes)

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint no encontrado"});
});

app.use((err, req, res, next) => {
    console.error(`[${err.name ?? 'Error'}] ${err.message}`, err.cause ?? '')
    res.status(err.status ?? 500).json({
        error: err.name ?? 'Error',
        message: err.message
    })
})


export default app
