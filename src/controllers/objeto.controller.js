import {conn} from '../../db/db.js'
import { ActualizarPeso, SacarIDMochila } from './MetodosObjeto.js'
    //Recordatorio: El query regresa un array con objetos 
    //Los objetos tienen la estructura de la tabla
    //Referirse a las propiedades de el objeto en especifico por cada entrada en la tabla

export const getObjetos = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM Objeto')
    res.json(rows)
}

export const getObjeto = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM Objeto WHERE idObjeto = ?', [req.params.idObj])

    if (rows.length === 0) {
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    console.log(rows[0])
    res.json(rows[0])
}

export const postObjeto = async (req,res) => {
    const {Nombre, Cantidad, Peso} = req.body

    const [result] = await conn.query('INSERT INTO Objeto(Nombre, Cantidad, Peso) VALUES (?,?,?)',[Nombre, Cantidad, Peso])
    const [idObjetoQuery] = await conn.query('SELECT last_insert_id() AS id;')
    const idObjeto = idObjetoQuery[0].id

    const [relacion] = await conn.query('INSERT INTO mochilaobjeto VALUES (?,?)', [idObjeto, req.params.idMochila])
    ActualizarPeso(req.params.idMochila);

    console.log[relacion];
    res.json({
        id:result.insertId,
        Nombre,
        Cantidad,
        Peso
    })
}

export const putObjeto = async (req,res) => {
    const {Nombre, Cantidad, Peso} = req.body 
    const [result] = await conn.query('UPDATE Objeto SET nombre = ?, cantidad = ?, peso = ? WHERE idObjeto = ?',[Nombre, Cantidad, Peso, req.params.idObj])

    const idMochila = await SacarIDMochila(req.params.idObj)
    ActualizarPeso(idMochila)

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }


export const deleteObjeto = async (req,res) => {
    const idMochila = await SacarIDMochila(req.params.idObj)
    await conn.query ('DELETE FROM mochilaobjeto WHERE FK_Objeto = ?', [req.params.idObj])
    const [result] = await conn.query('DELETE FROM Objeto WHERE idObjeto = ?', [req.params.idObj])
  
    ActualizarPeso(idMochila)

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
}


export const putObjetoX = async (req,res) => {
    const {Nombre, Cantidad, Peso} = req.body 
    const [result] = await conn.query('UPDATE Objeto SET nombre = IFNULL(?, nombre), cantidad = IFNULL(?, cantidad), peso = IFNULL(?, peso) WHERE idObjeto = ?',[Nombre, Cantidad, Peso, req.params.idObj])

    const idMochila = await SacarIDMochila(req.params.idObj)
    ActualizarPeso(idMochila)

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }

export const ActCantidadSum = async(req,res) => {
    const [result] = await conn.query('UPDATE Objeto SET cantidad = cantidad + 1 WHERE idObjeto = ?', [req.params.idObj])
    const idMochila = await SacarIDMochila(req.params.idObj)
    ActualizarPeso(idMochila)

        if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }

export const ActCantidadRes = async(req,res) => {
    const [Objeto] = await conn.query('SELECT * FROM objeto WHERE idObjeto = ?', [req.params.idObj])

    if (Objeto[0].Cantidad > 0){
    const [result] = await conn.query('UPDATE Objeto SET cantidad = cantidad - 1 WHERE idObjeto = ?', [req.params.idObj])
        
        if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
        }

    const idMochila = await SacarIDMochila(req.params.idObj)
    ActualizarPeso(idMochila)
    }
    else return res.status(404).json({message: "La cantidad de este objeto es de 0"})

    res.sendStatus(204)
    }

