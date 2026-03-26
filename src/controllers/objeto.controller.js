import {conn} from '../../db/db.js'
import { ActualizarPeso, SacarIDMochila } from './MetodosObjeto.js'
    //Recordatorio: El query regresa un array con objetos 
    //Los objetos tienen la estructura de la tabla
    //Referirse a las propiedades de el objeto en especifico por cada entrada en la tabla

export const getObjetos = async (req,res, next) => {
    try{
        const [rows] = await conn.query('SELECT * FROM Objeto')
        res.json(rows)
    } catch(err){
        next(err)
    }
}

export const getObjeto = async (req,res, next) => {
    try{
        const [rows] = await conn.query('SELECT * FROM Objeto WHERE idObjeto = ?', [req.params.idObj])

        if (rows.length === 0) {
            return res.status(404).json({message: "Objeto no encontrado"});
        }
        console.log(rows[0])
        res.json(rows[0])
    } catch(err){
        next(err)
    }
}

export const postObjeto = async (req,res, next) => {
    try{
    const {Nombre, Cantidad, Peso} = req.body

    const [result] = await conn.query('INSERT INTO Objeto(Nombre, Cantidad, Peso) VALUES (?,?,?)',[Nombre, Cantidad, Peso]) 
    const idObjeto = result.insertId

    const [relacion] = await conn.query('INSERT INTO mochilaobjeto VALUES (?,?)', [idObjeto, req.params.idMochila])
    await ActualizarPeso(req.params.idMochila);

    console.log[relacion];
    res.json({
        id:result.insertId,
        Nombre,
        Cantidad,
        Peso
    })
    } catch(err){
        next(err)
    }
}

export const putObjeto = async (req,res, next) => {
    try{
    const {Nombre, Cantidad, Peso} = req.body 
    const [result] = await conn.query('UPDATE Objeto SET nombre = ?, cantidad = ?, peso = ? WHERE idObjeto = ?',[Nombre, Cantidad, Peso, req.params.idObj])

    const idMochila = await SacarIDMochila(req.params.idObj)

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    await ActualizarPeso(idMochila)

    res.sendStatus(204)
        } catch(err){
            next(err)
        }
    }


export const deleteObjeto = async (req,res, next) => {
    try{
    const idMochila = await SacarIDMochila(req.params.idObj)
    await conn.query ('DELETE FROM mochilaobjeto WHERE FK_Objeto = ?', [req.params.idObj])
    const [result] = await conn.query('DELETE FROM Objeto WHERE idObjeto = ?', [req.params.idObj])

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    if (idMochila) await ActualizarPeso(idMochila)
    res.sendStatus(204)
    } catch(err){
        next(err)
    }
}


export const putObjetoX = async (req,res,next) => {
    try{
    const {Nombre, Cantidad, Peso} = req.body 
    const [result] = await conn.query('UPDATE Objeto SET nombre = IFNULL(?, nombre), cantidad = IFNULL(?, cantidad), peso = IFNULL(?, peso) WHERE idObjeto = ?',[Nombre, Cantidad, Peso, req.params.idObj])

    const idMochila = await SacarIDMochila(req.params.idObj)

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }

    if (idMochila) await ActualizarPeso(idMochila)
    
    res.sendStatus(204)
    
    } catch(err){
        next(err)
    }
}

export const ActCantidadSum = async(req,res, next) => {
    try{
    const [result] = await conn.query('UPDATE Objeto SET cantidad = cantidad + 1 WHERE idObjeto = ?', [req.params.idObj])
    const idMochila = await SacarIDMochila(req.params.idObj)

        if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    if (idMochila) await ActualizarPeso(idMochila)

    res.sendStatus(204)
    } catch (err){
        next(err)
    }
 }
export const ActCantidadRes = async(req,res, next) => {
    try{
    const [Objeto] = await conn.query('SELECT * FROM objeto WHERE idObjeto = ?', [req.params.idObj])
    if (Objeto.length === 0) return res.status(404).json({ message: "Objeto no encontrado" })
    if (Objeto[0].Cantidad <= 0) return res.status(400).json({ message: "La cantidad ya es 0" })

    if (Objeto[0].Cantidad > 0){
    const [result] = await conn.query('UPDATE Objeto SET cantidad = cantidad - 1 WHERE idObjeto = ?', [req.params.idObj])
        
        if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
        }

    const idMochila = await SacarIDMochila(req.params.idObj)
    if (idMochila) await ActualizarPeso(idMochila)
    }
    res.sendStatus(204)
    } catch(err){
        next(err)
    }
 }
