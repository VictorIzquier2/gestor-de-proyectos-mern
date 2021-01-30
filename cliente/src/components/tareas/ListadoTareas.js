import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTareas = () => {
  
  // Extraer proyectos d state inicial
  const proyectosContext = useContext(proyectoContext);
  const {proyecto, proyectos, eliminarProyecto} = proyectosContext;

  // obtener las tareas del context
  const tareasContext = useContext(tareaContext);
  const {tareasproyecto} = tareasContext;

  // si no hay un proyecto seleccionado
  if(!proyecto && proyectos.length > 0) return <h2>Selecciona un proyecto</h2>;
  else if(!proyecto && proyectos.length < 1) return <h2>No hay proyectos, comienza creando uno</h2>;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Elimina un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual.id);
  }

  return ( 
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className='listado-tareas'>
        {tareasproyecto.length === 0
          ? (<li className='tarea'><p>No hay tareas</p></li>)
          
          : <TransitionGroup>
            {tareasproyecto.map(tarea => (
            <CSSTransition
              key={tarea.id}
              timeout={300}
              classNames='tarea'
            >
              <Tarea
                tarea={tarea}
            />
            </CSSTransition>
          ))}
          </TransitionGroup>
        }
      <button
        type='button'
        className='btn btn-eliminar'
        onClick={onClickEliminar}
      >Eliminar Proyecto &times;</button>
      </ul>
    </Fragment>
   );
}
 
export default ListadoTareas;