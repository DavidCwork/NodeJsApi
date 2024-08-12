const conexion = require('../config/connection')

const clientSchema = new conexion.Schema({
    nombre: {
        type: String,   
        required: [true, 'el nombre completo debe ser ingresado'], trim: true,
        maxLength: [150, 'el nombre completo ingresado es muy extenso'], 
        minLength: [8, 'el nombre completo ingresado es muy corto']
    },
    telefono:{
        type: String,
        required: true, trim: true,
        minLength: [9, 'el telefono ingresado es muy corto'], 
        maxLength: [14, 'el telefono ingresado es muy extenso'],
    },
    direccion: {
        type: String, 
        required: true, 
        trim: true,
        minLength: [9, 'la dirección ingresada es muy corto'],      
    },
    habilitado: {
        type: Boolean, 
        default: true
    },
    usuario:{
        type: conexion.SchemaTypes.ObjectId,
        ref: "user"
    }
});

const clienteModel = conexion.model('clientes', clientSchema);
module.exports = clienteModel;