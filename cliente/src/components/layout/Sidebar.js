import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import Listado from '../proyectos/ListadoProyectos';

const Sidebar = () => {
  return ( 
    <aside>
      <h1>Gestor <span>de Proyectos</span></h1>
      <NuevoProyecto/>
      <div className='proyectos'>
        <h2>Tus proyectos</h2>
        <Listado/>
      </div>
    </aside>
   );
}
 
export default Sidebar;