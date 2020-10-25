import { personaSchema } from "../schemas/persona";

export function getMenores(personas) {

    return new Promise ((resolve, reject) => {
        let arrPersonas = personas.filter(persona => persona.edad < 40);

        if (arrPersonas.length){
            resolve(arrPersonas);

        }else{
            let err = "No hay personas mayores de 40";
            reject(err);
        }
    });

}