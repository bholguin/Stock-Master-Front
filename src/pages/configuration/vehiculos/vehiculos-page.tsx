import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Vehiculos, VeiculosStore } from "screens/configuration/vehiculos"
import { VehiculosServices } from "services/vehiculos"

const VehiculosPage: FC = () => {
    const navigate = useNavigate
    const vehiculos = useMemo(() => new VehiculosServices(), [])
    const store = useMemo(() => new VeiculosStore(
        vehiculos,
        navigate,
    ), [navigate, vehiculos])
    return(
        <Vehiculos store={store}/>
    )
}

export default VehiculosPage