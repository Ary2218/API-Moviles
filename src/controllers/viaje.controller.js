import {conn} from '../../db/db.js'
import { SacarMochilas } from './MetodosObjeto.js'

export const getViajes = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM viaje')
    //Recordatorio: El query regresa un array con objetos 
    //Los objetos tienen la estructura de la tabla
    res.json(rows)
}

export const getViaje = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM viaje WHERE id = ?', [req.params.id])

    if (rows.length === 0) {
        return res.status(404).json({message: "viaje no encontrado"});
    }
    console.log(rows[0])
    res.json(rows[0])
}

export const postViaje = async (req,res) => {
    const {Destino, Fecha} = req.body
    const [result] = await conn.query('INSERT INTO viaje(Destino, PesoTotal, Fecha) VALUES (?,0,?)',[Destino, Fecha])

    res.json({
        id:result.insertId,
        Destino,
        Fecha
    })
}

export const putViaje = async (req,res) => {
    const {id} = req.params
    const {nombre, destino, fecha} = req.body 
    const [result] = await conn.query('UPDATE viaje SET nombre = ?, destino = ?, fecha = ? WHERE id = ?',[nombre, destino, fecha, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Viaje no encontrado"});
    }
    res.sendStatus(204)
    }

export const deleteViaje = async (req,res) => {
    const Mochilas = SacarMochilas(id)

    await conn.query('DELETE FROM ViajeMochilas WHERE FK_Viaje = ?', [id])
    for (let i = 0; i<Mochilas; i++){
    await conn.query('DELETE from MochilaObjeto WHERE FK_Mochila = ?', [Mochilas[0].idMochila])
    await conn.query('DELETE FROM Objeto where idObjeto in (SELECT FK_Objeto FROM mochilaobjeto WHERE FK_Mochila = ?)', [Mochilas[0].idMochila])
    await conn.query('DELETE FROM Mochila WHERE idMochila = ?', [Mochilas[0].idMochila])
    }
    const [result] = await conn.query('DELETE FROM viaje WHERE id = ?', [req.params.id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "Viaje no encontrado"});
    }
    res.sendStatus(204)
}

export const putViajeX = async (req,res) => {
    const {id} = req.params
    const {nombre, destino, fecha} = req.body 
    const [result] = await conn.query('UPDATE viaje SET nombre = IFNULL(?, nombre), destino = IFNULL(?, destino), fecha = IFNULL(?, fecha) WHERE id = ?',[nombre, destino, fecha, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "viaje no encontrado"});
    }
    res.sendStatus(204)
    }