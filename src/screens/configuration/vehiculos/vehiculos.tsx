import { FC } from "react"
import { VeiculosStore } from "./vehiculos-store"
import { HeaderModule } from "components/HeaderModule"

type Props = {
    store: VeiculosStore
}

export const Vehiculos: FC<Props> = () => {
    return (
        <div>
            <HeaderModule
                title="Vehiculos"
                createFunction={() => { }}
            />
        </div>
    )
}