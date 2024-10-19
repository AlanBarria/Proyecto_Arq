import express from "express"
import cors from 'cors'
import db from "./database/db.js "
import usuarioRoutes from "./routes/routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/usuarios',usuarioRoutes)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
}

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
})

app.listen(8000, ()=>{
    console.log('Server UP runnig in http://localhost:8000/')
})

