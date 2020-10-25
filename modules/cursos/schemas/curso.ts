import {Schema, model} from 'mongoose';

const schemaCurso = new Schema({
    nombreCurso: String,
    profesor: String,
    anyo: Number,
    estado: Boolean

});

export let cursoSchema = model('Curso', schemaCurso,'cursos');
