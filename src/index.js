// "npm run dev" para correr en modo desarrollo
import app from "./app.js"
import { PORT } from "./config.js"

app.listen(PORT);
console.log("Servidor corriendo en el puerto 3000");