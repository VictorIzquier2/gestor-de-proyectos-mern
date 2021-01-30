import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {v4 as uuidv4} from 'uuid';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  MODIFICAR_TAREA
} from '../../types';
  
const TareaState = props => {
  const initialState = {
    tareas: [
    {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
    {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
    {id: 3, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3},
    {id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
    {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
    {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
    {id: 7, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3},
    {id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
    {id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
    {id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
    {id: 11, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3},
    {id: 12, nombre: 'Elegir Hosting', estado: true, proyectoId: 4}
  ],
  tareasproyecto: null,
  errortarea: false,
  tareaseleccionada: null
  
  }

  // Crear el dispatch y state 
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Crear las funciones

  // obtneer las tareas de un proyecto
  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    })
  }

  // Agregar una tarea al proyecto seleccionado 
  const agregarTarea = tarea => {
    tarea.id = uuidv4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    })
  }

  // Valida y muestra un error en caso de que sea necesario 
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  // Eliminar tarea por id
  const eliminarTarea = id => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    })
  }
  
  // Cambia el estado de cada tarea
  const cambiarEstadoTarea = tarea => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea
    })
  }

  // Extrae una tarea para edicion
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  // Modifica una tarea 
  const modificarTarea = tarea => {
    dispatch({
      type: MODIFICAR_TAREA,
      payload: tarea 
    })
  }

  return(
    <TareaContext.Provider 
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        modificarTarea
      }}>
      {props.children}
    </TareaContext.Provider>
  )
}
export default TareaState;