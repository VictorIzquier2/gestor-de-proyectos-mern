const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');
const {validationResult} = require('express-validator');

// Crea una nueva tarea 
exports.crearTarea = async (req, res)=> {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res
      .status(400)
      .send({
        status: 'error',
        mensaje: 'Error al validar la tarea',
        errores: errores.array()
      })
    }
    // Extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;
  try{
    const existeProyecto = await Proyecto.findById(proyecto);
    if(!existeProyecto){
      return res
        .status(404)
        .send({
          status: 'error',
          mensaje: 'Proyecto no encontrado'
        })
    }

    // Revisar si el proyecto actual pertenece al usuario autentificado
    if(existeProyecto.creador.toString() !== req.usuario.id){
      return res
        .status(401)
        .send({
          status: 'error',
          mensaje: 'No autorizado'
        })
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    return res
      .status(200)
      .send({
        status: 'success',
        mensaje: 'La tarea se ha creado correctamente',
        tarea
      })

  }catch(err){
    return res
      .status(500)
      .send({
        status: 'error',
        mensaje: 'Error al conectar con el servidor',
        err
      })
  }
}

// Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res
      .status(400)
      .send({
        status: 'error',
        mensaje: 'Error al validar la tarea',
        errores: errores.array()
      })
    }
    // Extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;
    const existeProyecto = await Proyecto.findOne({_id: proyecto});

    if(!existeProyecto){
      return res
        .status(404)
        .send({
          status: 'error',
          mensaje: 'Proyecto no encontrado'
        })
      }
    // Revisar si el proyecto actual pertenece al usuario autentificado
    if(existeProyecto.creador.toString() !== req.usuario.id){
      return res
        .status(401)
        .send({
          status: 'error',
          mensaje: 'No autorizado'
        })
    }

    //Obtener las tareas por proyecto
    const tareas = await Tarea.find({proyecto: proyecto});
    return res
        .status(401)
        .send({
          status: 'success',
          mensaje: 'Las consulta se ha realizado correctamente',
          tareas: tareas
        })
    
  }catch(err){
    return res
      .status(500)
      .send({
        status: 'error',
        mensaje: 'Error al conectar con el servidor',
        err
      })
  }
};

//Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res
      .status(400)
      .send({
        status: 'error',
        mensaje: 'Error al validar la tarea',
        errores: errores.array()
      })
    }
    // Extraer la tarea y comprobar si existe
    const {proyecto, nombre, estado} = req.body;
    let tarea = await Tarea.findOne({_id: req.params.id});

    if(!tarea){
      return res
        .status(404)
        .send({
          status: 'error',
          mensaje: 'Tarea no encontrada'
        })
      }
    
    // extraer el proyecto
    const existeProyecto = await Proyecto.findOne({_id: proyecto});
    
    // Revisar si el proyecto actual pertenece al usuario autentificado
    if(existeProyecto.creador.toString() !== req.usuario.id){
      return res
      .status(401)
      .send({
        status: 'error',
        mensaje: 'No autorizado'
      })
    }

    // crear un objeto con la nueva informacion
    const nuevaTarea = {};
    
    if(nombre) nuevaTarea.nombre = nombre;
    
    if(estado) nuevaTarea.estado = estado;

    // Actualizar la tarea
    tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
    return res
      .status(200)
      .send({
        status: 'success',
        mensaje: 'La tarea se ha actualizado correctamente',
        tarea: nuevaTarea
      })
    
  }catch(err){
    return res
      .status(500)
      .send({
        status: 'error',
        mensaje: 'Error al conectar con el servidor',
        err
      })
  }
};

exports.eliminarTarea = async (req, res) => {
  try{
     const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res
      .status(400)
      .send({
        status: 'error',
        mensaje: 'Error al validar la tarea',
        errores: errores.array()
      })
    }
    // Extraer la tarea y comprobar si existe
    const {proyecto} = req.body;
    let tarea = await Tarea.findOne({_id: req.params.id});

    if(!tarea){
      return res
        .status(404)
        .send({
          status: 'error',
          mensaje: 'Tarea no encontrada'
        })
      }
    
    // extraer el proyecto
    const existeProyecto = await Proyecto.findOne({_id: proyecto});
    
    // Revisar si el proyecto actual pertenece al usuario autentificado
    if(existeProyecto.creador.toString() !== req.usuario.id){
      return res
      .status(401)
      .send({
        status: 'error',
        mensaje: 'No autorizado'
      })
    }

    // Eliminar 
    await Tarea.findOneAndRemove({_id: req.params.id});
    return res
      .status(200)
      .send({
        status: 'success',
        mensaje: 'La tarea se ha borrado correctamente',
        tarea: tarea
      })

  }catch(err){
    return res
      .status(500)
      .send({
        status: 'error',
        mensaje: 'Error al conectar con el servidor',
        err
      })
  }
}