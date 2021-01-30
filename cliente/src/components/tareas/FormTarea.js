import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

  //extraer si un proyecto está activo del state inicial
  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext;
  
  // obtener la función del context de tarea 
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada, 
    errortarea, 
    agregarTarea, 
    validarTarea, 
    obtenerTareas,
    modificarTarea
  } = tareasContext;

  // useEffect que detecta si hay una tarea seleccionada
  useEffect(() => {
      if(tareaseleccionada !== null){
        guardarTarea(tareaseleccionada)
      }else{
        guardarTarea({
          nombre: ''
        })
      }
  }, [tareaseleccionada])

  // State del formulario 
  const [tarea, guardarTarea] = useState({
    nombre: ''
  })

  // destructuring state
  const {nombre} = tarea;

  // si no hay un proyecto seleccionado
  if(!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name] : e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    // validar
    if(nombre.trim() === '') {
      validarTarea();
      return;
    }

    // revisar si es edición o nueva tarea 
    if(tareaseleccionada === null){
      //tareanueva
      // agregar la nueva tarea al state de tareas
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    }else{
      // actualizar tarea existente
      modificarTarea(tarea);
    }

    // obtener y filtrar las tareas del proyecto actual
    obtenerTareas(tarea.proyectoId);

    // reiniciar el form 
    guardarTarea({
      nombre: ''
    })
  }
  
  return ( 
    <div className='formulario'>
      <form
        onSubmit={onSubmit}
      >
        <div className='contenedor-input'>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre Tarea...'
            name='nombre'
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className='contenedor-input'>
          <input
            type='submit'
            className='btn btn-primario btn-submit btn-block'
            value={tareaseleccionada ? 'Modificar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}
    </div>
   );
}
 
export default FormTarea;