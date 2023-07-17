import { useAxiosConfig } from "config/axios"
import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { UpdateVehiculo, UpdateVehiculoStore } from "screens/configuration/vehiculos/update-vehiculo"
import { VehiculosServices } from "services/vehiculos"

const UpdateVehiculosPage: FC = () => {
    useAxiosConfig()
    const navigate = useNavigate()
    const vehiculos = useMemo(() => new VehiculosServices(), [])
    const store = useMemo(() => new UpdateVehiculoStore(
        vehiculos,
        navigate,
    ), [navigate, vehiculos])
    return(
        <UpdateVehiculo store={store}/>
    )
}

export default UpdateVehiculosPage