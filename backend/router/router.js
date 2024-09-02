const express = require('express')
const controladorProductos = require('../controller/producto.controller')

const route = express.Router();

// productos
route.get('/productos', controladorProductos.consultarProductos)
route.get('/productos_form', controladorProductos.productosForm)
route.post('/productos_crear', controladorProductos.productosCrear)




module.exports = route