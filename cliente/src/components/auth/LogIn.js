import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const LogIn = () => {

  // State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    email: '',
    password: ''
  });

  // extraer de usuario
  const {email, password} = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }

  // Cuando el usuario quiere iniciar sesion
  const iniciarSesion = e => {
    e.preventDefault();
    
    // Validar que no haya campos vacíos

    // Pasarlo al action
  }

  return ( 
    <div className='form-usuario'>
      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar Sesión</h1>
        <form
          onSubmit={iniciarSesion}
        >
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Tu email'
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Tu Password'
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Iniciar Sesión'
            />
          </div>
        </form>
        <Link 
          to={'/sign-up'} 
          className='enlace-cuenta'
        >Sign Up</Link>
      </div>
    </div>
   );
}
 
export default LogIn;