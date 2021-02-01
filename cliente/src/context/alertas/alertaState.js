import React, {useReducer} from 'react';
import alertaReducer from './alertaReducer';
import AlertaContext from './alertaContext';
import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from '../../types';

const AlertaState = props => {
  const initialState = {
    alerta: null
  }
  const [state, dispatch] = useReducer(alertaReducer, initialState);

  // Funciones

  const mostrarAlerta = (mensaje, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        mensaje: mensaje,
        categoria: categoria
      }
    });
    
    // Después de 3 segundos hacer desaparecer la alerta
    setTimeout(()=> {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);

  }
  return(
    <AlertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  )
}

export default AlertaState;

