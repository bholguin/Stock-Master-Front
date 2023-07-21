import { FC } from "react"
import { SeguridadStore } from "./seguridad-store"

type Props = {
    store: SeguridadStore
}

export const Seguridad: FC<Props> = (props) => {
    return(
        <div>Seguridad</div>
    )
}