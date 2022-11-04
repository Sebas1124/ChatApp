import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchConToken } from '../helpers/fetch';
import { ScrollToBottom } from '../helpers/ScrollToBottom';
import { types } from './../types/types';

export const SidebarChatItem = ({ usuario }) => {

  const { chatState, dispatch } = useContext( ChatContext )

  const { chatActivo } = chatState;

  const onClick = async() => {

    dispatch({
      type: types.activarChat,
      payload: usuario._id
    })

    //cargar los mensajes del chat

    const resp = await fetchConToken(`mensajes/${usuario._id}`);
    const { mensajes } = resp;
    dispatch({
      type: types.cargarMensajes,
      payload: mensajes
    })

    ScrollToBottom('mensajes');
  }

  return (
    <div 
      onClick={ onClick } 
      className={`chat_list ${ (usuario._id === chatActivo) && 'active_chat' }`}
      >
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=740&t=st=1664227819~exp=1664228419~hmac=e77cf8cdd5918a3a29000afc179cf83a2311b393dd3089026abdc62c24838221" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>{ usuario.nombre }</h5>
                {
                  ( usuario.online )
                    ?<span className="text-success">Online</span>
                    :<span className="text-danger">Offline</span>
                }   
            </div>
        </div>
    </div>
  )
}
