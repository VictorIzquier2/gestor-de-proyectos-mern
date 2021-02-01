
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types';

export default(state,action) => {
  switch(action.type) {
    case REGISTRO_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        autentificado: true,
        mensaje: null
      }
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return{
        ...state,
        token: null,
        mensaje: action.payload
      }
    case OBTENER_USUARIO:
      return{
        ...state,
        usuario: action.payload
      }

    default:
      return state;
  }
}