import { useContext } from 'react'
import { SidebarChatItem } from './SidebarChatItem'
import { ChatContext } from './../context/chat/ChatContext';
import { AuthContext } from './../auth/AuthContext';

export const SideBar = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    const { uid } = auth;

  return (
    <div className="inbox_chat">

        {/* <!-- conversación activa inicio --> */}

            {
                chatState.usuarios
                    .filter( user => user._id !== uid )
                    .map( (usuario) => (
                        <SidebarChatItem 
                        key={ usuario._id }
                        usuario={ usuario }
                        />
                    )
                )
            }

        {/* <!-- conversación activa Fin --> */}


        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>


    </div>
  )
}
