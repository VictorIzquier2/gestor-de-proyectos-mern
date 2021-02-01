import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    autentificado: null,
    usuario: null,
    mensaje: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Las funciones
  const registrarUsuario = async datos => {
    try{
      console.log('datos' + datos);
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      console.log(respuesta.data);
      
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });

      // Obtener el usuario
      usuarioAutentificado();
    }catch(err){
      //console.log(err.response);
      const alerta = {
        mensaje: err.response.data.mensaje,
        categoria: 'alerta-error'
      }

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  // Devuelve el usuario autentificado
  const usuarioAutentificado = async () => {
    const token = localStorage.getItem('token');
    if(token){
      // TODO: funcion para enviar el token por headers
      tokenAuth(token);
    }
    try{
      const respuesta = await clienteAxios.get('/api/auth');
      //console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      })
    }catch(err){
      console.log(err.response)
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  return(
    <AuthContext.Provider
      value={{
        token: state.token,
        autentificado: state.autentificado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthState;