    import {conn} from '../../db/db.js'

    export async function ActualizarPeso(idMochila) {
        let PesoTotalMochila = 0;

        const [result] = await conn.query(
            'SELECT Peso, Cantidad FROM Objeto WHERE idObjeto IN (SELECT FK_Objeto FROM mochilaobjeto WHERE FK_Mochila = ?) AND Peso > 0;', 
            [idMochila]
        );

        for (let i = 0; i < result.length; i++) {
            PesoTotalMochila += (result[i].Peso * result[i].Cantidad);
        }

        await conn.query('UPDATE Mochila SET peso = ? WHERE idMochila = ?', [PesoTotalMochila, idMochila]);

        const Viaje = await SacarViaje(idMochila);

        if (Viaje && Viaje.length > 0) {
            const idViaje = Viaje[0].idViaje;
            await ActualizarPesoViaje(idViaje);
        } else {
            console.log(`La mochila ${idMochila} no tiene viaje asociado, no se actualizó el Viaje.`);
        }
    };

    export async function ActualizarPesoViaje(idViaje){
       const MochilasViaje = await SacarMochilas(idViaje)
       let PesoTotalViaje = 0;
       for (let i=0; i<MochilasViaje.length; i++){
            PesoTotalViaje = PesoTotalViaje+MochilasViaje[i].Peso
        }
        await conn.query('UPDATE Viaje SET PesoTotal = ? where idViaje = ?', [PesoTotalViaje, idViaje])
    }

    export async function SacarViaje (idMochila){
        const [Viaje] = await conn.query('SELECT * From viaje WHERE idViaje in (SELECT FK_Viaje FROM viajemochilas WHERE FK_Mochila = ?)', [idMochila])
        return Viaje
    }

    export async function SacarMochilas (idViaje){
        const [Mochilas] = await conn.query('SELECT * FROM mochila where idMochila in (SELECT FK_Mochila FROM viajemochilas WHERE FK_Viaje = ?)',[idViaje])
        return Mochilas
    }

    export async function SacarIDMochila (idObjeto) {
        const [result] = await conn.query('SELECT FK_Mochila from mochilaobjeto WHERE FK_Objeto = ?;', [idObjeto])
        if (result.length === 0) return null;

        return result[0].FK_Mochila
    }