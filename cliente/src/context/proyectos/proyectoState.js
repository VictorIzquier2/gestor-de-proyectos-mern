import React, {useReducer} from 'react';
import ProyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {v4 as uuidv4} from 'uuid';
import {
  FORMULARIO_PROYECTO, 
  OBTENER_PROYECTOS, 
  AGREGAR_PROYECTO, 
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO} from '../../types';
  

const ProyectoState = props => {

  const proyectos = [
  {id: 1, nombre: 'Tienda Virtual'},
  {id: 2, nombre: 'Intranet'},
  {id: 3, nombre: 'Diseño de Sitio web'}
]

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null
  }

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  // obtener los proyectos
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    })
  }

  // Agregar nuevo proyecto
  const agregarProyecto = proyecto => {
    proyecto.id = uuidv4();

    // inserta el proyecto en el state
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto
    })
  }

  // Validar el formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  // Selecciona el Proyecto que el usuario dio clic
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  // Elimina un proyecto
  const eliminarProyecto = proyectoId => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId
    })
  }
  

  return(
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  )

}
export default ProyectoState;