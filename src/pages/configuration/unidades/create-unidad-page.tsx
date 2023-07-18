import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateUnidad, CreateUnidadStore } from "screens/configuration/unidades/create-unidad"
import { UnidadesMedidasServices } from "services/unidades_medidas"

const CreateUnidadPage: FC = () => {
    const navigate = useNavigate()
    const unidades = useMemo(() => new UnidadesMedidasServices(), [])
    const store = useMemo(() => new CreateUnidadStore(
        unidades,
        navigate,
    ), [navigate, unidades])

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <CreateUnidad store={store}/>
    )
}

export default CreateUnidadPage