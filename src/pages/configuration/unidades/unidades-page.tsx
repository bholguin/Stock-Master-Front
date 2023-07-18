import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { UnidadesMedidas, UnidadesMedidasStore } from "screens/configuration/unidades"
import { UnidadesMedidasServices } from "services/unidades_medidas"

const UnidadesMedidasPage: FC = () => {
    const navigate = useNavigate()
    const unidades = useMemo(() => new UnidadesMedidasServices(), [])
    const store = useMemo(() => new UnidadesMedidasStore(
      unidades,
        navigate,
    ), [navigate, unidades])
    
    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });
      
    return(
        <UnidadesMedidas store={store}/>
    )
}

export default UnidadesMedidasPage