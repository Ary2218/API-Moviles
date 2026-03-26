    import {conn} from '../../db/db.js'
    import { DBError, NotFoundError } from '../errores/errores.js'

    export async function ActualizarPeso(idMochila) {
    try{
        let PesoTotalMochila = 0;

        const [result] = await conn.query(
            'SELECT Peso, Cantidad FROM Objeto WHERE idObjeto IN (SELECT FK_Objeto FROM mochilaobjeto WHERE FK_Mochila = ?) AND Peso > 0;', 
            [idMochila]
        ).catch(err=> {throw new DBError(`Error al obtener objetos de mochila ${idMochila}`, err) });

        for (let i = 0; i < result.length; i++) {
            PesoTotalMochila += (result[i].Peso * result[i].Cantidad);
        }

        await conn.query('UPDATE Mochila SET peso = ? WHERE idMochila = ?', [PesoTotalMochila, idMochila]).catch(err => { throw new DBError(`Error al actualizar peso de mochila ${idMochila}`, err) });

        const Viaje = await SacarViaje(idMochila);

        if (Viaje && Viaje.length > 0) {
            const idViaje = Viaje[0].idViaje;
            await ActualizarPesoViaje(idViaje);
        } else {
            console.log(`La mochila ${idMochila} no tiene viaje asociado, no se actualizó el Viaje.`);
        }

        } catch (err) {
        if (err.name === 'DBError') throw err;
        throw new DBError(`Fallo en ActualizarPeso para mochila ${idMochila}`, err);
      }
    };

    export async function ActualizarPesoViaje(idViaje){
    try{
       const MochilasViaje = await SacarMochilas(idViaje)
       let PesoTotalViaje = 0;
       
        if (!MochilasViaje || MochilasViaje.length === 0) {
            throw new NotFoundError(`No se encontraron mochilas para el viaje ${idViaje}`);
        }

       for (let i=0; i<MochilasViaje.length; i++){
            PesoTotalViaje = PesoTotalViaje+MochilasViaje[i].Peso
        }
        await conn.query('UPDATE Viaje SET PesoTotal = ? where idViaje = ?', [PesoTotalViaje, idViaje]).catch(err => { throw new DBError(`Error al actualizar peso del viaje ${idViaje}`, err) });


        } catch (err) {
            if (err.name === 'DBError' || err.name === 'NotFoundError') throw err;
            throw new DBError(`Fallo en ActualizarPesoViaje para viaje ${idViaje}`, err);
        }
    }

    export async function SacarViaje (idMochila){
        try{
        const [Viaje] = await conn.query('SELECT * From viaje WHERE idViaje in (SELECT FK_Viaje FROM viajemochilas WHERE FK_Mochila = ?)', [idMochila])
        return Viaje
         } catch (err) {
        throw new DBError(`Error al obtener viaje de la mochila ${idMochila}`, err);
    }
    }

    export async function SacarMochilas (idViaje){
        try{
            const [Mochilas] = await conn.query('SELECT * FROM mochila where idMochila in (SELECT FK_Mochila FROM viajemochilas WHERE FK_Viaje = ?)',[idViaje])
                return Mochilas
        } catch (err) {
                throw new DBError(`Error al obtener mochilas del viaje ${idViaje}`, err);
        }
    }

    export async function SacarIDMochila (idObjeto) {
        try{
        const [result] = await conn.query('SELECT FK_Mochila from mochilaobjeto WHERE FK_Objeto = ?;', [idObjeto])
        if (result.length === 0) return null;

        return result[0].FK_Mochila
        }catch(err){    
            throw new DBError(`Error al obtener mochila de el objeto ${idObjeto}`, err)
        }
    }