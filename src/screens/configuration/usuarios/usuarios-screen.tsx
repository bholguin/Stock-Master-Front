import { FC, useEffect } from "react"
import { UsuariosStore } from "./usuarios-store"

type Props = {
    store: UsuariosStore
}

export const Usuarios: FC<Props> = (props) => {

    useEffect(() => {
        props.store.getUsuarios.run()
    }, [props.store])

    return(
        <div>pagina para usuarios</div>
    )
}