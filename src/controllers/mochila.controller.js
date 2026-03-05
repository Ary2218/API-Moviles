import {conn} from '../../db/db.js'

export const getMochilas = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM Mochila')
    //Recordatorio: El query regresa un array con Mochilas 
    //Los Mochilas tienen la estructura de la tabla
    res.json(rows)
}

export const getMochila = async (req,res) => {
    const [rows] = await conn.query('SELECT * FROM Mochila WHERE id = ?', [req.params.id])

    if (rows.length === 0) {
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    console.log(rows[0])
    res.json(rows[0])
}

export const postMochila = async (req,res) => {
    const {Nombre, Peso} = req.body
    const [result] = await conn.query('INSERT INTO Mochila(Nombre, Peso) VALUES (?,0)',[Nombre, Peso])

    res.json({
        id:result.insertId,
        Nombre,
        Peso
    })
}

export const putMochila = async (req,res) => {
    const {id} = req.params
    const {nombre} = req.body 
    const [result] = await conn.query('UPDATE Mochila SET nombre = ?, WHERE id = ?',[nombre, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    res.sendStatus(204)
    }

export const deleteMochila = async (req,res) => {
    const [result] = await conn.query('DELETE * FROM Mochila WHERE id = ?', [req.params.id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    res.sendStatus(204)
}

export const putMochilaX = async (req,res) => {
    const {id} = req.params
    const {nombre, destino, fecha} = req.body 
    const [result] = await conn.query('UPDATE Mochila SET nombre = IFNULL(?, nombre) WHERE id = ?',[nombre, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    res.sendStatus(204)
    }