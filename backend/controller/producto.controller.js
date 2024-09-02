const modeloProducto = require('../models/producto.model')

exports.consultarProductos = async(req,res)=>{
    const consultaProd = await modeloProducto.find({});
    if(consultaProd){
        res.render('pages/productos', {
            productos: consultaProd,
        
        })
    }else{ 
        res.render('pages/productos', {"mensaje":"no hay datos disponibles"})
    }
}

exports.productosForm = async(req,res) => {
    res.render('pages/productos_form')
}

exports.productosCrear = async(req,res) => {
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
        res.render('pages/productos')
    }else{
        res.render('pages/productos')
    }
}