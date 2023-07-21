import { FC, useMemo } from "react"
import { Seguridad, SeguridadStore } from "screens/perfil/seguridad"

const SeguridadPage: FC = () => {
    const store = useMemo(() => new SeguridadStore(), [])
    return(
        <Seguridad store={store}/>
    )
}

export default SeguridadPage