const express = require('express')
const controladorProductos = require('../controller/producto.controller')
const modeloUsuario = require('../models/user.model')

const route = express.Router();

route.get('/inicio',async(req,res)=>{
    res.render('pages/index', {   
    })
})

// login
route.get('/login', async (req, res) => {
    const consulta = await modeloUsuario.find({});
    res.render('pages/login', {
    });
}); 

// productos
route.get('/productos', controladorProductos.consultarProductos)
route.get('/productos_form', controladorProductos.productosForm)
route.post('/productos_crear', controladorProductos.productosCrear)

// catalogo

route.get('/catalogo', controladorProductos.consultarCatalogo)



module.exports = route