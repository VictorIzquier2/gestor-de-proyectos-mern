import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';



function App() {
  return (
    <ProyectoState>
      <TareaState>
        <Router>
          <Switch>
            <Route exact path='/' component={LogIn}/>
            <Route exact path='/sign-up' component={SignUp}/>
            <Route exact path='/proyectos' component={Proyectos}/>
          </Switch>
        </Router>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
