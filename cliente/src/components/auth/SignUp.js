import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {
  // State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    name: '',
    email: '',
    password: '',
    confirmar: ''
  });

  // extraer de usuario
  const {name, email, password, confirmar} = usuario;

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
    
    // Password mínimo de 6 caracteres

    // los 2 password son iguales

    // Pasarlo al action
  }

  return ( 
    <div className='form-usuario'>
      <div className='contenedor-form sombra-dark'>
        <h1>Registrarse</h1>
        <form
          onSubmit={iniciarSesion}
        >
          <div className='campo-form'>
            <label htmlFor='name'>Usuario</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Tu usuario'
              onChange={onChange}
            />
          </div>
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
            <label htmlFor='confirmar'>Confirmar</label>
            <input
              type='password'
              id='confirmar'
              name='confirmar'
              value={confirmar}
              placeholder='Confirmar Password'
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registrarse'
            />
          </div>
        </form>
        <Link 
          to={'/'} 
          className='enlace-cuenta'
        >Log In</Link>
      </div>
    </div>
   );
} 
export default SignUp;