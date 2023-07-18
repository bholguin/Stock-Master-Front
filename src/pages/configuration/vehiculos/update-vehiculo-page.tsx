import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateVehiculo, UpdateVehiculoStore } from "screens/configuration/vehiculos/update-vehiculo"
import { VehiculosServices } from "services/vehiculos"

const UpdateVehiculosPage: FC = () => {
    const params = useParams<{vehiculo_id: string}>()
    const navigate = useNavigate()
    const vehiculos = useMemo(() => new VehiculosServices(), [])
    const store = useMemo(() => new UpdateVehiculoStore(
        vehiculos,
        navigate,
        params.vehiculo_id
    ), [navigate, vehiculos, params]);

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <UpdateVehiculo store={store}/>
    )
}

export default UpdateVehiculosPage