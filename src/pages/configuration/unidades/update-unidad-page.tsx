import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateUnidad, UpdateUnidadStore } from "screens/configuration/unidades/update-unidad"
import { UnidadesMedidasServices } from "services/unidades_medidas"

const UpdateUnidadPage: FC = () => {
    const params = useParams<{unidad_id: string}>()
    const navigate = useNavigate()
    const unidades = useMemo(() => new UnidadesMedidasServices(), [])
    const store = useMemo(() => new UpdateUnidadStore(
      unidades,
        navigate,
        params.unidad_id
    ), [navigate, unidades, params]);

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <UpdateUnidad store={store}/>
    )
}

export default UpdateUnidadPage