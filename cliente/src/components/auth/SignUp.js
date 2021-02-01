import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';

const SignUp = (props) => {

  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext); 
  const {mensaje, autentificado, registrarUsuario} = authContext;

  // En caso de que nuestro usuario se haya autentificado o registrado o sea un registro duplicado
  useEffect(() => {
    if(autentificado){
      props.history.push('/proyectos');
    }
    if(mensaje){
      mostrarAlerta(mensaje.mensaje, mensaje.categoria);
    }
  }, [mensaje, autentificado, props.history])

  // State para iniciar sesion
  const [user, guardarUsuario] = useState({
    usuario: '',
    email: '',
    password: '',
    confirmar: ''
  });

  // extraer de usuario
  const {usuario, email, password, confirmar} = user;

  const onChange = (e) => {
    guardarUsuario({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  // Cuando el usuario quiere iniciar sesion
  const iniciarSesion = e => {
    e.preventDefault();
    
    // Validar que no haya campos vacíos
    if(usuario.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
    }
    
    // Password mínimo de 6 caracteres
    if(password.length < 6) {
      mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
    }

    // los 2 password son iguales
    if(password !== confirmar){
      mostrarAlerta('El password no coincide con la confirmación', 'alerta-error')
    }

    // Pasarlo al action
    registrarUsuario({
      usuario,
      email,
      password
    })
  }

  return ( 
    <div className='form-usuario'>
      {alerta
      ?
        (
          <div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div>
        )
      : null}
      <div className='contenedor-form sombra-dark'>
        <h1>Registrarse</h1>
        <form
          onSubmit={iniciarSesion}
        >
          <div className='campo-form'>
            <label htmlFor='usuario'>Usuario</label>
            <input
              type='text'
              id='usuario'
              name='usuario'
              value={usuario}
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