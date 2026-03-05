import {conn} from '../../db/db.js'

export const getObjetos = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM Objeto')
    //Recordatorio: El query regresa un array con objetos 
    //Los objetos tienen la estructura de la tabla
    res.json(rows)
}

export const getObjeto = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM Objeto WHERE idObjeto = ?', [req.params.id])

    if (rows.length === 0) {
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    console.log(rows[0])
    res.json(rows[0])
}

export const postObjeto = async (req,res) => {
    const {nombre, cantidad, peso} = req.body
    const [result] = await conn.query('INSERT INTO Objeto(Nombre, Cantidad, Peso) VALUES (?,?,?,0)',[nombre, cantidad, peso])

    res.json({
        id:result.insertId,
        nombre,
        cantidad,
        peso
    })
}

export const putObjeto = async (req,res) => {
    const {id} = req.params
    const {nombre, cantidad, peso} = req.body 
    const [result] = await conn.query('UPDATE Objeto SET nombre = ?, cantidad = ?, peso = ? WHERE idObjeto = ?',[nombre, cantidad, peso, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }

export const deleteObjeto = async (req,res) => {
    const [result] = await conn.query('DELETE * FROM Objeto WHERE idObjeto = ?', [req.params.id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
}

export const putObjetoX = async (req,res) => {
    const {id} = req.params
    const {nombre, cantidad, peso} = req.body 
    const [result] = await conn.query('UPDATE Objeto SET nombre = IFNULL(?, nombre), cantidad = IFNULL(?, cantidad), peso = IFNULL(?, peso) WHERE idObjeto = ?',[nombre, cantidad, peso, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }

export const ActCantidadSum = async(req,res) => {
    const {id} = req.params
    const [result] = await conn.query('UPDATE Objeto SET cantidad = cantidad + 1 WHERE idObjeto = ?', [id])

        if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }

export const ActCantidadRes = async(req,res) => {
    const {id} = req.params
    const [result] = await conn.query('UPDATE Objeto SET cantidad = cantidad - 1 WHERE idObjeto = ?', [id])

        if (result.affectedRows === 0){
        return res.status(404).json({message: "Objeto no encontrado"});
    }
    res.sendStatus(204)
    }


