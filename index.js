const exp = require('express');
const modeloUsuario = require('./backend/models/user.model')
require('dotenv').config();

const app = exp();

const logger = require('morgan')
app.use(logger('dev'));

app.use(exp.urlencoded({extended: false}));
app.use(exp.json())


app.get('/usuario', async (req,res)=>{
    const consulta = await modeloUsuario.find({});
    if (consulta)
        res.status(200).json(consulta)
});

/* filtrar por campo  
*/
app.get('/usuario/:campo', async (req,res)=>{
    let usuarioEncontrado = await modeloUsuario.findOne({correo:req.params.campo});
    if (usuarioEncontrado)
        res.status(200).json(usuarioEncontrado);
    else 
        res.status(404).json({"error": "Usuario no encontrado"})
})

/* Agregar usuario
*/
app.post('/usuario', async(req,res)=>{
    const usuarioNuevo = {
        correo: req.body.correo,
        pass: req.body.pass,
        rol: req.body.rol,
        habilitado: true,
    };
    let insertar = await modeloUsuario.create(usuarioNuevo);
    if(insertar)
        res.status(200).json({"mensaje": "creado correctamente"})
    else
        res.status(404).json({"error": "usuario no creado"})
})

/* Actualizar usuario
*/

app.put('/usuario/:campo', async (req,res)=>{
    const usuarioEditado ={
        correo: req.body.correo,
        pass: req.body.pass,
        rol : req.body.rol,
        habilitado: true,
    }
    let actualizar = await modeloUsuario.findOneAndUpdate({correo:req.params.campo},usuarioEditado);
    if(actualizar)
        res.status(200).json({"mensaje": "se actualizo correctamente"})
    else
        res.status(404).json({"mensaje": "No se actualizo"})
})


app.listen(process.env.PORT)