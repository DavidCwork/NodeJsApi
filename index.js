const exp = require('express');
const router = require('./backend/router/router')
const modeloUsuario = require('./backend/models/user.model')
const modeloProducto = require('./backend/models/producto.model')
const modeloCliente = require('./backend/models/cliente.model')
const modeloPedido = require('./backend/models/pedido.model')
require('dotenv').config();

// variable para enviar correo 
const emailService = require ('./backend/utils/email.service')

const app = exp();
const logger = require('morgan');
const { sendEmail } = require('./backend/utils/email.service');
app.use(logger('dev'));

app.use('/v1', router),
app.use(exp.urlencoded({extended: false}));
app.use(exp.json())


const path = require('path')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/frontend/views'));

// interfaces

app.get('/inicio',async(req,res)=>{
    const consulta = await modeloUsuario.find({});
    res.render('pages/index', {
        usuarios: consulta,
     
    })
})

app.get('/login',async(req,res)=>{
    const consulta = await modeloUsuario.find({});
    res.render('pages/login', {
        
    })
})



app.post('/login-datos',async(req,res)=>{
    console.log(req.body)
    res.render('pages/login')
})


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

/* Eliminar usuario
*/
app.delete('/usuario/:id', async (req, res) => {
    console.log(req.params.id , req.body.referenciaUsuario)
    let eliminacion = await modeloProducto.findByIdAndDelete({referencia:req.params.id});
    if(eliminacion)
        res.status(200).json({"mensaje":"Eliminación exitosa"})
    else
        res.status(404).json({"mensaje":"Se presentó un error"})
});

app.get('/enviarcorreo', async (req,res)=>{
    await emailService.sendEmail(
        "cirosofia67@gmail.com",
        "confirmación de registro",
        "bienvenido a la tienda en linea guys",
    );
})
/* Productos */

app.get('/productosListar', async (req,res) => {
    const consulta = await modeloProducto.find({});
    if (consulta)
        res.status(200).json(consulta) 
        
       
})

app.post('/agregarProducto', async(req,res)=>{
    const nuevoProducto = {
        referencia:req.body.referencia,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        stock:req.body.stock,
        imagen:req.body.imagen,
        habilitado: true
    };

    let insertar = await modeloProducto.create(nuevoProducto)
    if(insertar){
        res.status(200).json({'mensaje':'agregado correctamente'}) 
    }else{
        res.status(404).json({'error':'No se agregó'}) 
    }
})


app.put('/actualizarProducto/:ref', async (req,res)=>{
    const actualizarProducto = {
        referencia:req.body.referencia,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        stock:req.body.stock,
        imagen:req.body.imagen,
        habilitado: true
    };

    let actualizar = await modeloProducto.findOneAndUpdate({_id:req.params.ref},actualizarProducto)
    if(actualizar){
        res.status(200).json({'mensaje':'actualizado correctamente'}) 
    }else{
        res.status(404).json({'error':'No se actualizó'}) 
    }

})


app.delete('/eliminarProducto/:id', async (req,res) => {
    const eliminar = await modeloProducto.findOneAndDelete({referencia:req.params.id});
    res.status(200).json({"mensaje":"Eliminado correctamente"})   
})

/* clientes */

app.get('/clientes', async (req,res) => {
    const consulta = await modeloCliente.find({});
    if (consulta) 
        res.status(200).json(consulta)

})

app.post('/agregarCliente', async(req,res)=>{
    const nuevoCliente = {
        nombre:req.body.nombre,
        telefono:req.body.telefono,
        direccion:req.body.direccion,
        habilitado:req.body.true,
        usuario:req.body.usuario
    };

    let insertar = await modeloCliente.create(nuevoCliente)
    if(insertar){
        res.status(200).json({'mensaje':'agregado correctamente'}) 
    }else{
        res.status(404).json({'error':'No se agregó'}) 
    }
})


app.put('/actualizarCliente/:ref', async (req,res)=>{
    const actualizarCliente = {
        nombre:req.body.nombre,
        telefono:req.body.telefono,
        direccion:req.body.direccion,
        habilitado:req.body.true    
    };

    let actualizar = await modeloCliente.findOneAndUpdate({_id:req.params.ref},actualizarCliente)
    if(actualizar){
        res.status(200).json({'mensaje':'actualizado correctamente'}) 
    }else{
        res.status(404).json({'error':'no se actualizó'}) 
    }

})


app.delete('/eliminarCliente/:id', async (req,res) => {
    const eliminar = await modeloCliente.findOneAndDelete({telefono:req.params.id});
    res.status(200).json({"mensaje":"eliminado correctamente"})   
})


/* Pedidos */

app.get('/pedido', async (req,res) => {
    const consulta = await modeloPedido.find({});
    if (consulta)
        res.status(200).json(consulta)
       
})

app.post('/agregarPedido', async(req,res)=>{
    const nuevoPedido = {
        cliente:req.body.cliente,
        carrito:req.body.carrito,
        subtotal:req.body.carrito,
        impuesto:req.body.impuesto,
        total:req.body.total,
        estado:req.body.estado    
    };

    let insertar = await modeloPedido.create(nuevoPedido)
    if(insertar){
        res.status(200).json({'mensaje':'Agregado correctamente'}) 
    }else{
        res.status(404).json({'error':'no se agregó'}) 
    }
})


app.put('/actualizarPedido/:ref', async (req,res)=>{
    const actualizarPedido = {
        cliente:req.body.cliente,
        carrito:req.body.carrito,
        subtotal:req.body.carrito,
        impuesto:req.body.impuesto,
        total:req.body.total,
        estado:req.body.estado    
    };

    let update = await modeloPedido.findOneAndUpdate({_id:req.params.ref},actualizarPedido)
    if(update){
        res.status(200).json({'mensaje':'Actualizado'}) 
    }else{
        res.status(404).json({'error':'no se actualizo'}) 
    }

})


app.delete('/eliminarPedido/:id', async (req,res) => {
    const eliminar = await modeloPedido.findOneAndDelete({referencia:req.params.id});
    res.status(200).json({"mensaje":"Eliminado correctamente"})   
})


app.listen(process.env.PORT)