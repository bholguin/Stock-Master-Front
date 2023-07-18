import { useAxiosConfig } from "config/axios"
import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateVehiculo, CreateVehiculoStore } from "screens/configuration/vehiculos/create-vehiculo"
import { VehiculosServices } from "services/vehiculos"

const CreateVehiculosPage: FC = () => {
    useAxiosConfig()
    const navigate = useNavigate()
    const vehiculos = useMemo(() => new VehiculosServices(), [])
    const store = useMemo(() => new CreateVehiculoStore(
        vehiculos,
        navigate,
    ), [navigate, vehiculos])

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <CreateVehiculo store={store}/>
    )
}

export default CreateVehiculosPage