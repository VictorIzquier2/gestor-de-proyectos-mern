import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Proyectos from './components/proyectos/Proyectos';




function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LogIn}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route exact path='/proyectos' component={Proyectos}/>
      </Switch>
    </Router>
  );
}

export default App;
