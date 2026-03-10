import {conn} from '../../db/db.js'
import { ActualizarPeso, ActualizarPesoViaje, SacarViaje } from './MetodosObjeto.js'

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
    const {idViaje} = req.params
    const {Nombre} = req.body

    const [result] = await conn.query('INSERT INTO Mochila(Nombre, Peso) VALUES (?,0)',[Nombre])
    const [idMochilaQuery] = await conn.query('SELECT last_insert_id() AS id;')
    const idMochila = idMochilaQuery[0].id

    const [relacion] = await conn.query('INSERT INTO viajemochilas VALUES (?,?)', [idViaje, idMochila])

    console.log[relacion]
    res.json({
        id:result.insertId,
        Nombre
    })
}

export const putMochila = async (req,res) => {
    const {Nombre} = req.body 
    const [result] = await conn.query('UPDATE Mochila SET nombre = ? WHERE idMochila = ?',[Nombre, req.params.id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    res.sendStatus(204)
    }

export const deleteMochila = async (req,res) => {
    let id = req.params.id

    const Viaje = await SacarViaje(id)
    const idViaje = Viaje[0].idViaje
    const [ObjetosBorrar] = await conn.query('SELECT FK_Objeto FROM mochilaobjeto WHERE FK_Mochila = ?', [id])
    
    await conn.query('DELETE FROM ViajeMochilas WHERE FK_Mochila = ?', [id])
    await conn.query('DELETE from MochilaObjeto WHERE FK_Mochila = ?', [id])
    const [result] = await conn.query('DELETE FROM Mochila WHERE idMochila = ?', [id])

    for (let i = 0; i < ObjetosBorrar.length; i++){
        await conn.query('DELETE FROM Objeto where idObjeto = ?', [ObjetosBorrar[i].FK_Objeto])
    }

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "Mochila no encontrado"});
    }

    if (idViaje){
        await ActualizarPesoViaje(idViaje)
    }
    res.sendStatus(204)
}

export const putMochilaX = async (req,res) => {
    const {id} = req.params
    const {nombre, destino, fecha} = req.body 
    const [result] = await conn.query('UPDATE Mochila SET nombre = IFNULL(?, nombre) WHERE idMochila = ?',[nombre, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    res.sendStatus(204)
    }

