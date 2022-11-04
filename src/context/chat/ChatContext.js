import React, { createContext, useReducer } from "react";
import { chatReducer } from "./ChatReducer";

export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, // UID del usuario al que quiero enviar mensaje
    usuarios: [], // Todos los usuarios de la BD
    mensajes: [], // Chat selecionado
}

export const ChatProvider = ({ children }) => {

    const [ chatState, dispatch ] = useReducer( chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ 
             chatState,
             dispatch
         }}>
        {children}
    </ChatContext.Provider>
  )
}

