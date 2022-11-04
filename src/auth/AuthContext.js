import React, { createContext, useCallback, useContext, useState } from 'react'
import { fectSinToken, fetchConToken } from "./../helpers/fetch";
import { ChatContext } from './../context/chat/ChatContext';
import { types } from './../types/types';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState);

    const { dispatch } = useContext( ChatContext );

    const login = async( email, password ) => {

      const resp = await fectSinToken('login', { email, password }, 'POST');

      if ( resp.ok ) {

        const { usuario } = resp;

        localStorage.setItem('token', resp.token);

        setAuth({
          uid: usuario._id,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
        })
      }
      
      return resp.ok;

    }

    const register = async( nombre, email, password ) => {
      const resp = await fectSinToken('login/new', { nombre, email, password }, 'POST');

      if ( resp.ok ) {

        const { usuario } = resp;

        localStorage.setItem('token', resp.token);

        setAuth({
          uid: usuario._id,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
        })

      }
      
      return resp.ok;

    }

    const verificarToken = useCallback( async() => {

      const token = localStorage.getItem('token');

      //Si el token no existe
      if ( !token ) {
         setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
        })

        return false;
      }

      const resp = await fetchConToken('login/renew');

      if ( resp.ok ) {

        const { usuario } = resp;

        localStorage.setItem('token', resp.token);

        setAuth({
          uid: usuario._id,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
        })
        
        return true;

      } else {
         setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
        })

        return false
      }
      
    }, []);

    const logout = () => {
        localStorage.removeItem('token');

        dispatch({
          type: types.cerrarSesion,
        });

        setAuth({
          checking: false,
          logged: false,
        })
    }

  return (
    <AuthContext.Provider value={{ 
        login,
        register,
        verificarToken,
        logout,
        auth,
     }}>
        
        { children }
    </AuthContext.Provider>    
  )
}
