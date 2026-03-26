import {conn} from '../../db/db.js'
import { ActualizarPeso, ActualizarPesoViaje, SacarViaje } from './MetodosObjeto.js'

export const getMochilas = async (req,res, next) => {
    try{
    const [rows] = await conn.query('SELECT * FROM Mochila')
    //Recordatorio: El query regresa un array con Mochilas 
    //Los Mochilas tienen la estructura de la tabla
    res.json(rows)
    } catch(err){
        next(err)
    }
}

export const getMochila = async (req,res, next) => {
    try{
        const [rows] = await conn.query('SELECT * FROM Mochila WHERE idMochila = ?', [req.params.id])

        if (rows.length === 0) {
            return res.status(404).json({message: "Mochila no encontrado"});
        }
        console.log(rows[0])
        res.json(rows[0])
        } catch(err){
            next(err)
        }
    }

export const postMochila = async (req,res, next) => {
    try{
        const {idViaje} = req.params
        const {Nombre} = req.body

        const [result] = await conn.query('INSERT INTO Mochila(Nombre, Peso) VALUES (?,0)',[Nombre])
        const idMochila = result.insertId

        const [relacion] = await conn.query('INSERT INTO viajemochilas VALUES (?,?)', [idViaje, idMochila])

        console.log[relacion]
        res.json({
            id:result.insertId,
            Nombre
        })
    } catch(err){
        next(err)
    }
}

export const putMochila = async (req,res, next) => {
    try{
        const {Nombre} = req.body 
        const [result] = await conn.query('UPDATE Mochila SET nombre = ? WHERE idMochila = ?',[Nombre, req.params.id])

        if (result.affectedRows === 0){
            return res.status(404).json({message: "Mochila no encontrado"});
        }
        res.sendStatus(204)
        } catch(err){
            next(err)
        }
    }

export const deleteMochila = async (req,res, next) => {
    try{
        let id = req.params.id

        const Viaje = await SacarViaje(id)
        const idViaje = Viaje && Viaje.length > 0 ? Viaje[0].idViaje : null
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
    } catch (err) {
        next(err)
    }
}

export const putMochilaX = async (req,res, next) => {
    try{
    const {id} = req.params
    const {nombre, destino, fecha} = req.body 
    const [result] = await conn.query('UPDATE Mochila SET nombre = IFNULL(?, nombre) WHERE idMochila = ?',[nombre, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Mochila no encontrado"});
    }
    res.sendStatus(204)
    } catch (err)
    {
        next(err)
    }
}

