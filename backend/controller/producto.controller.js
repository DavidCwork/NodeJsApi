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

exports.consultarCatalogo = async(req,res)=>{
    const consultaProd = await modeloProducto.find({ });
    if(consultaProd){
        res.render('pages/catalogo', {
            productos: consultaProd,
        })
    }else{ 
        res.render('pages/productos', {"mensaje":"no hay datos disponibles"})
    }
}

exports.obtenerProductoPorReferencia = async (req, res) => {
    try {
        const producto = await modeloProducto.findOne({ referencia: req.params.referencia });
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

exports.editarProducto = async (req, res) => {
    try {
        const actualizarProducto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            imagen: req.body.imagen,
            habilitado: true
        };

        const producto = await modeloProducto.findOneAndUpdate(
            { referencia: req.body.referencia },
            actualizarProducto,
            { new: true }
        );

        if (producto) {
            res.json({ mensaje: "Actualizado correctamente" });
        } else {
            res.status(404).json({ error: 'No se actualizó' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};