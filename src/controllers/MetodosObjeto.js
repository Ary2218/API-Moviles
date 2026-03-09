    import {conn} from '../../db/db.js'

    export async function ActualizarPeso (idMochila) 
    {
        let PesoTotalMochila = 0;
        const Viaje = await SacarViaje(idMochila)
        const idViaje = Viaje[0].idViaje
        const [result] = await conn.query('SELECT Peso, Cantidad FROM Objeto WHERE idObjeto in (SELECT idObjeto FROM mochilaobjeto where FK_Mochila = ?) and Peso > 0;',[idMochila])
        console.log(result)
        
        for (let i=0; i<result.length; i++){
            let Peso = result[i].Peso
            let Cantidad = result[i].Cantidad
            PesoTotalMochila = PesoTotalMochila+(Peso*Cantidad)
        }

        await conn.query('UPDATE Mochila SET peso = ? where idMochila = ?', [PesoTotalMochila,idMochila])
        ActualizarPesoViaje(idViaje)
    };

    export async function ActualizarPesoViaje(idViaje){
       const MochilasViaje = await SacarMochilas(idViaje)
       let PesoTotalViaje = 0;
       for (let i=0; i<MochilasViaje.length; i++){
            let Peso = MochilasViaje[i].Peso
            PesoTotalViaje = PesoTotalViaje+Peso
        }
        await conn.query('UPDATE Viaje SET PesoTotal = ? where idViaje = ?', [PesoTotalViaje, idViaje])
    }

    export async function SacarViaje (idMochila){
        const [Viaje] = await conn.query('SELECT * From viaje WHERE idViaje in (SELECT FK_Viaje FROM viajemochilas WHERE FK_Mochila = ?)', [idMochila])
        console.log(Viaje)
        return Viaje
    }

    export async function SacarMochilas (idViaje){
        const [Mochilas] = await conn.query('SELECT * FROM mochila where idMochila in (SELECT FK_Mochila FROM viajemochilas WHERE FK_Viaje = ?)',[idViaje])
        console.log("Proceso SacarMochilas funcionandos")
        console.log(Mochilas)
        return Mochilas
    }

    export async function SacarIDMochila (idObjeto) {
        const [result] = await conn.query('SELECT FK_Mochila from mochilaobjeto WHERE FK_Objeto = ?;', [idObjeto])
        if (result.length === 0) return null;

        return result[0].FK_Mochila
    }