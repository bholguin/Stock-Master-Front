import { FC, useEffect } from "react"
import { EmpresasStore } from "./empresas-store"

type Props = {
    store: EmpresasStore
}

export const Empresas: FC<Props> = (props) => {

    useEffect(() => {
        props.store.getUsuarios.run()
    }, [props.store])

    return(
        <div>pagina para Empresas</div>
    )
}