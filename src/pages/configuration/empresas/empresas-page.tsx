import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Empresas, EmpresasStore } from "screens/configuration/empresas"
import { EmpresaServices } from "services/empresa"

export const EmpresasPage: FC = () => {
    const navigate = useNavigate()
    const empresa = useMemo(() => new EmpresaServices(), [])

    const store = useMemo(() => new EmpresasStore(
        empresa,
        navigate
    ), [empresa, navigate])

    return (
        <Empresas store={store} />
    )
}

export default EmpresasPage