import {conn} from '../../db/db.js'
import { SacarMochilas } from './MetodosObjeto.js'


export const getViajes = async (req,res, next) => {
    try{
    const [rows] = await conn.query('SELECT * FROM viaje')
    //Recordatorio: El query regresa un array con objetos 
    //Los objetos tienen la estructura de la tabla
    res.json(rows)
    } catch(err){
        next(err)
    }
}

export const getViaje = async (req,res, next) => {
    try{
    const [rows] = await conn.query('SELECT * FROM viaje WHERE idViaje = ?', [req.params.id])

    if (rows.length === 0) {
        return res.status(404).json({message: "viaje no encontrado"});
    }
    console.log(rows[0])
    res.json(rows[0])
    } catch(err) {
        next(err)
    }
}

export const postViaje = async (req,res, next) => {
    try{
    const {Destino, Fecha} = req.body
    const [result] = await conn.query('INSERT INTO viaje(Destino, PesoTotal, Fecha) VALUES (?,0,?)',[Destino, Fecha])

    res.json({
        id:result.insertId,
        Destino,
        Fecha
    }) } catch (err){
        next(err)
    }

}

export const putViaje = async (req,res, next) => {
    try{
    const {id} = req.params
    const {Destino, Fecha} = req.body 
    const [result] = await conn.query('UPDATE viaje SET destino = ?, fecha = ? WHERE id = ?'[Destino, Fecha, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "Viaje no encontrado"});
    }
    res.sendStatus(204)
    } catch (err){
        next(err)
    }
    }
    

export const deleteViaje = async (req, res, next) => {
    const { id } = req.params;

    try {
        const Mochilas = await SacarMochilas(id);
        await conn.query('DELETE FROM ViajeMochilas WHERE FK_Viaje = ?', [id]);

        for (let i = 0; i < Mochilas.length; i++) {
            const idMochilaActual = Mochilas[i].idMochila;

            const [ObjetosBorrar] = await conn.query(
                'SELECT FK_Objeto FROM mochilaobjeto WHERE FK_Mochila = ?', 
                [idMochilaActual]
            );
            await conn.query('DELETE FROM MochilaObjeto WHERE FK_Mochila = ?', [idMochilaActual]);

            for (let j = 0; j < ObjetosBorrar.length; j++) {
                await conn.query('DELETE FROM Objeto WHERE idObjeto = ?', [ObjetosBorrar[j].FK_Objeto]);
            }


            await conn.query('DELETE FROM Mochila WHERE idMochila = ?', [idMochilaActual]);
        }

        const [result] = await conn.query('DELETE FROM viaje WHERE idViaje = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Viaje no encontrado" });
        }

        res.sendStatus(204);

    } catch (err) {
        next(err)
    }
};

export const putViajeX = async (req,res, next) => {
    try{
    const {id} = req.params
    const {destino, fecha} = req.body 
    const [result] = await conn.query('UPDATE viaje SET destino = IFNULL(?, destino), fecha = IFNULL(?, fecha) WHERE idViaje = ?',[destino, fecha, id])

    if (result.affectedRows === 0){
        return res.status(404).json({message: "viaje no encontrado"});
    }
    res.sendStatus(204)
    } catch(err){
        next(err)
    }
}